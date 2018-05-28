import rtg from 'random-token-generator';
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

import log from '../../config/log4js.config';
import sequelize from '../../util/conn.mysql';
import userModel from './index';
import UserDao from './user.dao';
import GroupDao from '../group/group.dao';
import GroupUserMapDao from '../group/groupUserMap.dao';
import StaffInfoDao from './staff-info.dao';
import PatientInfoDao from './patient-info.dao';
import groupModel from '../group/index';
import groupUserMapModel from '../group/index';
import MessageService from '../message/message.service';
import RoleService from '../role/role.service';
import RoleModel from '../role/index';
import EmailService from '../../util/email.service';
import Properties from '../../util/properties';

const userDao = new UserDao();
const groupDao = new GroupDao();
const groupUserMapDao = new GroupUserMapDao();
const messageService = new MessageService();
const roleService = new RoleService();
const emailService = new EmailService();
const staffInfoDao = new StaffInfoDao();
const patientInfoDao = new PatientInfoDao();

/**
 * UserService 
 */
class UserService {
    constructor() {}

    register(user, callback) {
        //generate random key
        rtg.generateKey({
            len: 16,
            string: true,
            strong: false,
            retry: false
        }, function(err, key) {
            if (err) {
                log.info(err);
            } else {
                user.token = key; //assign generated key to user
            }
        });
        bcrypt.hash(user.password, 10, (err, hash) => {
            user.password = hash;
            return userDao.insert(user, (userInserted) => {
                //update createdBy and updatedBy
                userInserted.createdBy = userInserted.id;
                userInserted.updatedBy = userInserted.id;
                userModel.user.update({ "createdBy": userInserted.id, "updatedBy": userInserted.id }, {
                    where: {
                        id: userInserted.id
                    }
                }).then(() => {
                    callback(userInserted);
                }).catch((err) => {
                    log.error('Error while updating the user ', err);
                });

                RoleModel.role.findOne({ where: { name: userInserted.role } }).then((role) => {
                    var userRole = {
                        userId: userInserted.id,
                        roleId: role.id
                    };
                    roleService.createUserRole(userRole, (userRole) => {});
                });
                if (userInserted.role.toLowerCase() == 'doctor') {
                    this.activationLink(userInserted);
                    var group = {
                        name: 'MedHelp',
                        url: `/medhelp/${userInserted.id}`,
                        userId: userInserted.id,
                        description: 'Med help',
                        createdBy: userInserted.id,
                        updatedBy: userInserted.id
                    };
                    return groupDao.insert(group, (createdGroup) => {
                        var groupUserMap = {
                            userId: createdGroup.userId,
                            groupId: createdGroup.id,
                            createdBy: createdGroup.userId,
                            updatedBy: createdGroup.userId
                        };
                        groupUserMapDao.insert(groupUserMap, (createdGroupUserMap) => {});
                        sequelize
                            .query("select u.id, u.firstname, u.role, u.email, count(gu.userId) from user u LEFT JOIN group_user_map gu on u.id=gu.userId and u.role='BOT' group by u.id order by count(gu.userId) ASC", { type: sequelize.QueryTypes.SELECT })
                            .then((groupUserMaps) => {
                                var uId;
                                for (var i = 0; i < groupUserMaps.length; i++) {
                                    if (groupUserMaps[i].role.toLowerCase() == 'bot') {
                                        uId = groupUserMaps[i].id;
                                        break;
                                    } else {
                                        continue;
                                    }
                                }
                                var groupUserMapBot = {
                                    groupId: createdGroup.id,
                                    userId: uId,
                                    createdBy: uId,
                                    updatedBy: uId
                                }
                                groupUserMapDao.insert(groupUserMapBot, (createdGroupUserMap) => {});
                                var msg = {
                                    receiverId: createdGroup.id,
                                    receiverType: 'group', // group or individual
                                    senderId: uId,
                                    text: 'Welcome to Mesomeds!! How can we help you?',
                                    createdTime: Date.now(),
                                    updatedTime: Date.now()
                                }
                                messageService.sendMessage(msg, (result) => {});
                            });
                    });
                } else if (userInserted.role.toLowerCase() === 'patient') {
                    this.activationLink(userInserted);
                    this.creatPatientInfo(userInserted);
                    var group = {
                        name: 'MedHelp',
                        url: `/medhelp/${userInserted.id}`,
                        userId: userInserted.id,
                        description: 'Med help',
                        createdBy: userInserted.id,
                        updatedBy: userInserted.id
                    };
                    return groupDao.insert(group, (createdGroup) => {
                        var groupUserMap = {
                            userId: createdGroup.userId,
                            groupId: createdGroup.id,
                            createdBy: createdGroup.userId,
                            updatedBy: createdGroup.userId
                        };
                        groupUserMapDao.insert(groupUserMap, (createdGroupUserMap) => {});
                        sequelize
                            .query("select u.id, u.firstname, u.role, u.email, count(gu.userId) from user u LEFT JOIN group_user_map gu on u.id=gu.userId and u.role='BOT' group by u.id order by count(gu.userId) ASC", { type: sequelize.QueryTypes.SELECT })
                            .then((groupUserMaps) => {
                                var uId;
                                for (var i = 0; i < groupUserMaps.length; i++) {
                                    if (groupUserMaps[i].role.toLowerCase() == 'bot') {
                                        uId = groupUserMaps[i].id;
                                        break;
                                    } else {
                                        continue;
                                    }
                                }
                                var groupUserMapBot = {
                                    groupId: createdGroup.id,
                                    userId: uId,
                                    createdBy: uId,
                                    updatedBy: uId
                                }
                                groupUserMapDao.insert(groupUserMapBot, (createdGroupUserMap) => {});
                                var msg = {
                                    receiverId: createdGroup.id,
                                    receiverType: 'group', // group or individual
                                    senderId: uId,
                                    text: 'Welcome to Mesomeds!! How can we help you?',
                                    createdTime: Date.now(),
                                    updatedTime: Date.now()
                                }
                                messageService.sendMessage(msg, (result) => {});
                            });
                    });
                } else if (userInserted.role.toLowerCase() === 'bot') {
                    // create staffInfo entry in staff_info table
                    this.creatStaffInfo(userInserted);
                } else {
                    // return if none of the fields match
                    return;
                }
            });
        });
    }

    /**
     * activation link method
     */
    activationLink(user) {
        var subject = 'Email activation link';
        // body of the mail for user
        const userOutput = `
            <p>Hello ${user.firstname} ${user.lastname}</p>
            <p>Thank you for registering. Please click on the below link for activation.</p>
            <a href="${Properties.activation}/${user.token}" target="_blank">
                Click here to confirm
            </a>
            <p>Thanks and Regards,<br/>Mesomeds</p>
            `;
        // body of the mail for admin
        const adminOutput = `
            <p>Newsletter Request</p>
            <h3>Contact Details</h3>
            <ul>
                <li>FullName: ${user.name}</li>
                <li>Email ID: ${user.email}</li>
                <li>Subject: ${subject}</li>
            </ul>
            <h3>Message</h3>
            <p>Message: User confirmed.</p>
            `
        emailService.sendEmail(userOutput, adminOutput, user.email, subject);
    }

    /**
     * change activate column and match token
     */
    activateUser(token, callback) {
        userModel.user.find({ where: { token: token } }).then((resultFind) => {
            if (resultFind.token === token) {
                userModel.user.update({ "activate": 1 }, { where: { token: resultFind.token } });
                callback(resultFind);
            } else {
                log.error('Error while updating the user ');
            }
        }).catch((err) => {
            log.error('Error while updating the user ', err);
        });
    }

    updateRegisteredUser(user, callback) {
        return userDao.update(user, (userUpdated) => {
            callback(userUpdated);
        });
    }

    getAll(callback) {
        return userDao.readAll((allUsers) => {
            callback(allUsers);
        });
    }

    getById(id, callback) {
        return userDao.readById(id, (userById) => {
            callback(userById);
        });
    }

    deleteRegisteredUser(id, callback) {
        return userDao.delete(id, (userDeleted) => {
            callback(userDeleted);
        });
    }

    /**
     * Find user by email for the login component
     */
    findUserByEmail(email, callback) {
        userModel.user.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            callback(user);
        }).catch(err => {
            log.error('Error while fetching user in user service: ', err);
            callback({ message: 'Email ID you have entered does not exist' });
        });
    }

    /**
     * send reset password link for the specified email
     */
    resetPasswordMail(email, callback) {
        this.findUserByEmail(email, (user) => {
            if (user.email === email) {
                var subject = 'Reset password link';
                const userOutput = `
                <p>Hello</p>
                <p>Thank you for contacting us. Please click on the below link to reset your password.</p>
                <a href="${Properties.resetPassword}/${user.token}" target="_blank">
                    Click here to reset password
                </a>
                <p>Thanks and Regards,<br/>Mesomeds</p>
                `;

                // body of the mail for admin
                const adminOutput = `
                <p>Newsletter Request</p>
                <h3>Contact Details</h3>
                <ul>
                    <li>FullName: ${user.name}</li>
                    <li>Email ID: ${user.email}</li>
                    <li>Subject: ${subject}</li>
                </ul>
                <h3>Message</h3>
                <p>Message: Reset password link.</p>
                `
                emailService.sendEmail(userOutput, adminOutput, user.email, subject, callback);
            } else {
                callback({ message: 'Email ID you have entered does not exist' });
            }
        });
    }

    verifyToken(token, callback) {
        userModel.user.find({ where: { token: token } }).then((user) => {
            if (user === null) {
                callback(false);
            } else {
                callback(true);
            }
        }).catch((err) => {
            callback(false);
        });
    }

    resetPassword(password, token, callback) {
        bcrypt.hash(password, 10, (err, hash) => {
            userModel.user.update({ password: hash }, { where: { token: token } })
                .then((res) => {
                    if (res[0] > 0) {
                        callback({ message: 'Updated password successfully.' });
                    } else {
                        log.error('Tokens do not match');
                        callback({ message: 'Link in invalid. Please try again.' });
                    }
                }).catch((err) => {
                    log.error('Error in updating password: ' + err);
                    callback({ message: 'Error in password reset. Please try again..' });
                });
        });
    }

    creatStaffInfo(userInserted) {
        var staffInfo = {
            userId: userInserted.id,
            createdBy: userInserted.createdBy,
            updatedBy: userInserted.updatedBy
        };
        staffInfoDao.insert(staffInfo, (staffInfoInserted) => {});
    }

    getStaffInfoById(id, callback) {
        staffInfoDao.readById(id, (staffInfo) => {
            callback(staffInfo);
        });
    }

    updateStaffInfo(staffInfo, callback) {
        staffInfoDao.update(staffInfo, (updatedStaffInfo) => {
            callback(updatedStaffInfo);
        });
    }

    creatPatientInfo(userInserted) {
        var patientInfo = {
            userId: userInserted.id,
            createdBy: userInserted.createdBy,
            updatedBy: userInserted.updatedBy
        };
        patientInfoDao.insert(patientInfo, (patientInfoInserted) => {});
    }

    getPatientInfoById(id, callback) {
        patientInfoDao.readById(id, (patientInfo) => {
            callback(patientInfo);
        });
    }

    updatePatientInfo(patientInfo, callback) {
        patientInfoDao.update(patientInfo, (updatedPatientInfo) => {
            callback(updatedPatientInfo);
        });
    }
}

export default UserService;