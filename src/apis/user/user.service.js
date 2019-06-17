import rtg from 'random-token-generator';
import bcrypt from 'bcrypt';
import http from 'http';
import log from '../../config/log4js.config';
import sequelize from '../../util/conn.mysql';
import userModel from './index';
import UserDao from './user.dao';
import GroupDao from '../group/group.dao';
import GroupUserMapDao from '../group/groupUserMap.dao';
import StaffInfoDao from './staff-info.dao';
import VisitorDao from '../visitor/visitor.dao';
import MessageService from '../message/message.service';
import RoleService from '../role/role.service';
import RoleModel from '../role/index';
import Properties from '../../util/properties';
import AuditService from '../audit/audit.service';
import AuditModel from '../audit/audit.model';
import emailConfig from '../../config/email.config';
import msgconfig from '../../config/message.config';
import NotificationService from '../notification/notification.service';
import VisitorService from '../visitor/visitor.service';
const userDao = new UserDao();
const groupDao = new GroupDao();
const groupUserMapDao = new GroupUserMapDao();
const messageService = new MessageService();
const roleService = new RoleService();
const staffInfoDao = new StaffInfoDao();
const visitorDao = new VisitorDao();
const auditService = new AuditService();
const notificationService = new NotificationService();
const visitorService = new VisitorService();

/**
 * UserService 
 */
class UserService {

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
                const dob = user.dob;
                delete(user.dob);
                user.socketId = [];
                user.firstLogin = false;
                
                return userDao.insert(user, (userInserted) => {
                    // if a user exists with same email and mobile execute this block this is to prevent duplicate registrations
                    if (userInserted.original) {
                        if (userInserted.original.code === "ER_DUP_ENTRY") {
                            return callback({
                                "error": "DUP_ENTRY",
                                "message": "An user already exists with this email and/or phone number. Please login using your password"
                            }); //check for dup entry for email and phoneNo
                        }
                    }
                    var audit = new AuditModel({
                        senderId: userInserted.id,
                        receiverId: '',
                        receiverType: '',
                        mode: '',
                        entityName: 'visitor',
                        entityEvent: 'registration',
                        createdBy: userInserted.id,
                        updatedBy: userInserted.id,
                        createdTime: Date.now(),
                        updatedTime: Date.now()
                    });
                    auditService.create(audit, (auditCreated) => {});
                    //update createdBy and updatedBy
                    userInserted.createdBy = userInserted.id;
                    userInserted.updatedBy = userInserted.id;
                    userModel.user.update({
                        "createdBy": userInserted.id,
                        "updatedBy": userInserted.id
                    }, {
                        where: {
                            id: userInserted.id
                        },
                        sideEffects: false
                    }).then(() => {
                        callback(userInserted);
                    }).catch((err) => {
                        log.error('Error while updating the user ', err);
                    });

                    RoleModel.role.findOne({
                        where: {
                            name: userInserted.role
                        }
                    }).then((role) => {
                        var userRole = {
                            userId: userInserted.id,
                            roleId: role.id
                        };
                        roleService.createUserRole(userRole, (userRole) => {});
                    });
                    if (userInserted.role.toLowerCase() == 'doctor') {
                        this.activationLink(userInserted);
                        //call admin mail sender with all the doctor info like speciality and mci reg no etc
                        this.adminDoctorRegistration(user);
                        var group = {
                            name: 'MedHelp',
                            url: `/medhelp/${userInserted.id}`,
                            userId: userInserted.id,
                            phase: 'active',
                            details: {
                                description: 'General enquiry available 24x7',
                                speciality: 'General enquiry'
                            },
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
                                .query("select u.id, u.firstname, u.lastname, u.role, u.email, count(gu.userId) from user u LEFT JOIN consultation_group_user_map gu on u.id=gu.userId and u.role='BOT' group by u.id order by count(gu.userId) ASC", {
                                    type: sequelize.QueryTypes.SELECT
                                })
                                .then((groupUserMaps) => {
                                    var uId;
                                    var uName;
                                    for (var i = 0; i < groupUserMaps.length; i++) {
                                        if (groupUserMaps[i].role.toLowerCase() == 'bot') {
                                            uId = groupUserMaps[i].id;
                                            uName = groupUserMaps[i].firstname + ' ' + groupUserMaps[i].lastname;
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
                                        senderName: uName,
                                        text: 'Welcome to Mesomeds!! How can we help you?',
                                        createdBy: uId,
                                        updatedBy: uId,
                                        createdTime: Date.now(),
                                        updatedTime: Date.now()
                                    }
                                    messageService.sendMessage(msg, (result) => {});
                                });
                        });
                    } else if (userInserted.role.toLowerCase() === 'patient') {
                        this.activationLink(userInserted);
                        //call  admin mail sender with patient info
                        this.adminUserRegistration(userInserted);
                        this.createVisitor(userInserted, dob);
                        var group = {
                            name: 'MedHelp',
                            url: `/medhelp/${userInserted.id}`,
                            userId: userInserted.id,
                            details: {
                                description: 'General enquiry available 24x7',
                                speciality: 'General enquiry'
                            },
                            phase: 'active',
                            status: 'online',
                            requireInfo: false,
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
                                .query("select u.id, u.firstname, u.lastname, u.role, u.email, count(gu.userId) from user u LEFT JOIN consultation_group_user_map gu on u.id=gu.userId and u.role='BOT' group by u.id order by count(gu.userId) ASC", {
                                    type: sequelize.QueryTypes.SELECT
                                })
                                .then((groupUserMaps) => {
                                    var uId;
                                    var uName;
                                    for (var i = 0; i < groupUserMaps.length; i++) {
                                        if (groupUserMaps[i].role.toLowerCase() == 'bot') {
                                            uId = groupUserMaps[i].id;
                                            uName = groupUserMaps[i].firstname + ' ' + groupUserMaps[i].lastname;
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
                                        senderName: uName,
                                        text: 'Welcome to Mesomeds!! How can we help you?',
                                        createdBy: uId,
                                        updatedBy: uId,
                                        createdTime: Date.now(),
                                        updatedTime: Date.now()
                                    }
                                    messageService.sendMessage(msg, (result) => {});

                                    //create audit entry for default group 
                                    var audit = new AuditModel({
                                        senderId: uId,
                                        receiverId: createdGroup.id,
                                        receiverType: 'group',
                                        mode: 'Guided mode',
                                        entityName: 'group',
                                        entityEvent: 'added',
                                        createdBy: uId,
                                        updatedBy: uId,
                                        createdTime: Date.now(),
                                        updatedTime: ''
                                    });
                                    auditService.create(audit, (auditCreated) => {});
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
        //this method creates notifications and store them in DB upon email or message sending
    createNotification(userId, type, title, channel, templateTo, templateBody) {
            const notification = {
                userId: userId,
                type: type,
                title: title,
                content: null,
                status: 'sent',
                channel: channel,
                priority: 0,
                template: {
                    to: templateTo,
                    from: 'support@awnics.com',
                    body: templateBody,
                    signature: '',
                    attachment: '',
                },
                triggerTime: Date.now(),
                createdBy: userId,
                updatedBy: userId,
            };
            notificationService.create(notification, (res) => {
                res ? log.info('Notification created ' + channel + ' to ' + templateTo) : log.error('Error in creating notification for ' + type + ' through ' + channel);
            });
        }
        /**
         * activation link method
         */
    activationLink(user) {
        const template = user.role === "patient" ? "user-registration" : "doctor-registration";
        const title = user.role === "patient" ? "User Registration" : "Doctor Registration";
        emailConfig
            .send({
                template: template,
                message: {
                    to: user.email
                },
                locals: {
                    userName: user.firstname + ' ' + user.lastname,
                    userLink: Properties.activation + '/' + user.token,
                }
            })
            .then(res => {
                this.createNotification(user.id, 'registration', 'Activaton link sent for ' + title, 'email', user.email, template);
                log.info('Email sent to user ' + user.email + ' for ' + title);
            })
            .catch(error => log.error('Error while sending activation link to ' + user.email + ' ' + error));
        const message = user.role === "patient" ? msgconfig.userMessage : msgconfig.doctorMessage;
        this.sendTextMessage(user.id, user.phoneNo, msgconfig.authkey, msgconfig.country, message, user.firstname + ' ' + user.lastname, 'registration', "Message sent for " + title);
    }

    adminDoctorRegistration(doctorDetails) {
        emailConfig
            .send({
                template: 'admin-doctor-registration',
                message: {
                    to: 'support@awnics.com'
                },
                locals: {
                    userName: doctorDetails.firstname + ' ' + doctorDetails.lastname,
                    subject: `Doctor Registration`,
                    userEmail: doctorDetails.email,
                    mciRegNumber: doctorDetails.regNo,
                    phoneNo: doctorDetails.phoneNo,
                    speciality: doctorDetails.speciality,
                    experience: doctorDetails.experience + ' Years'

                }
            })
            .then(res => {
                log.info('Email sent to Admin for Doctor Registration');
            })
            .catch(error =>
                log.error('Error while sending activation mail for Doctor ' + doctorDetails.email + ' ' + error)
            );
    }

    adminUserRegistration(user) {
        emailConfig
            .send({
                template: 'admin-user-registration',
                message: {
                    to: 'support@awnics.com'
                },
                locals: {
                    subject: 'User Registration',
                    userName: user.firstname + ' ' + user.lastname,
                    userEmail: user.email,
                }
            })
            .then(res => {
                log.info('Admin mail sent successfully for user registration  of ' + user.email);
            })
            .catch(error =>
                log.error('Error while sending admin mail for User registration of ', error)
            );
    }

    // sends a registration confirmation text message to user
    sendTextMessage(userId, phone, authkey, country, message, userName, type, title) {
        const msg = message.replace('User', userName);
        http.get(`http://api.msg91.com/api/sendhttp.php?sender=MESMED&route=4&mobiles=${phone}&authkey=${authkey}&country=${country}&message=${msg}`, (response) => {
            log.info('Message sent to ' + phone);
            this.createNotification(userId, type, title, 'message', phone, msg);
        });
    }

    /**
     * change activate column and match token
     */
    activateUser(token, callback) {
        userModel.user.find({
            where: {
                token: token,
                activate: 0
            }
        }).then((resultFind) => {
            if (resultFind) {
                userModel.user.update({
                    "activate": 1
                }, {
                    where: {
                        token: resultFind.token
                    },
                     sideEffects: false
                }).then((userUpdated) => {
                    callback({"status":"success","message":"Activation Successful"});
                    userModel.user.update({token: null}, { where: {token: token}, sideEffects: false}).then((tokenDeleted) => {
                        log.info(`Token: ${token} deleted for user`);
                    }).catch(err => {
                        log.error('Error in deleting token '+err);
                    })
                });
            } else {
                callback({"status":"failed","error":"Invalid token"})
                log.error('Error while updating the user ');
            }
        }).catch((err) => {
            log.error('Error while updating the user ', err);
        });
    }

    validateEmailAndMobile(email, phoneNo, callback){
        userModel.user.find({ where: sequelize.or({email: email}, {phoneNo: phoneNo})}).then((result)=>{
            if(result === null){
                return callback(true);
            } else {
                return callback({
                    "error": "DUP_ENTRY",
                    "message": "An user already exists with this email and/or phone number. Please login using your password"
                    })
            }
        })
    }
    updateRegisteredUser(user, callback) {
        return userDao.update(user, (userUpdated) => {
            callback(userUpdated);
        });
    }

    updateRegisteredUserDetails(user, callback) {
        if(!user.id){
            user.id = user.userId;
        }else {
            user.userId = user.id;
        }
        this.getById(user.userId, (userDetails) => {
            user.socketId = userDetails.socketId;
            console.log(user);
            return userDao.update(user, (userUpdated) => {
                callback(userUpdated);
            });
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
            callback({
                message: 'Email ID you have entered does not exist'
            });
        });
    }

    /**
     * send reset password link for the specified email
     */
    resetPasswordMail(userEmail, callback) {
        this.findUserByEmail(userEmail, (user) => {
            if (user) {
            var func = this;
               rtg.generateKey({
                    len: 16,
                    string: true,
                    strong: false,
                    retry: false
                }, function(err, key) {
                    if (err) {
                        log.info(err);
                        callback({"status":"failed","error":"Something went wrong"});
                    } else {
                   
                userModel.user.update({
                    "token": key
                }, {
                    where: {
                        email: user.email
                    },
                     sideEffects: false
                }).then((userUpdated) => {              
            emailConfig
                .send({
                    template: 'forgot-password',
                    message: {
                        to: user.email
                    },
                    locals: {
                        subject: 'Password reset Link',
                        userName: user.firstname + ' ' + user.lastname,
                        userLink: Properties.resetPassword + '/' + key,
                    }
                })
                .then(res => {
                    //recheck this
                    log.info('Resetmail sent to User successfully ' + user.email);
                    callback({"status":"success","message":"An email has been sent to your mail ID with a link to reset password"});
                     //send text message to user upon request for password reset
                    func.sendTextMessage(user.id, user.phoneNo, msgconfig.authkey, msgconfig.country, msgconfig.passwordResetMessage, user.firstname + ' ' + user.lastname, 'passwordreset', 'Reset Message sent');
                    func.createNotification(user.id, 'resetpassword', 'Reset Link sent', 'email', userEmail, 'forgot-password');
                })
                .catch(err =>
                    log.error('Error while sending reset password link for ' + user.email + ' ' + err)
                );
            emailConfig
                .send({
                    template: 'admin-reset-password',
                    message: {
                        to: 'support@awnics.com'
                    },
                    locals: {
                        userName: user.firstname + ' ' + user.lastname,
                        userEmail: user.email,
                    }
                })
                .then(res => {
                    log.info('Resetmail sent to Admin successfully');
                })
                .catch(error =>
                    log.error('Error  while sending Email to admin for restmail of ' + user.email + ' ' + error)
                ); 
                });   
                    }
                });
            } else {
                callback({
                    "status": "failed",
                    "error": 'Email ID you have entered does not exist'
                });
            }
        })
    }

    verifyToken(token, callback) {
        userModel.user.find({
            where: {
                token: token
            }
        }).then((user) => {
            if (user === null) {
                callback(false);
            } else {
                callback(true);
            }
        }).catch((err) => {
            log.error('Error while varifying token in user service ', err);
            callback(false);
        });
    }

    resetPassword(password, token, callback) {
        bcrypt.hash(password, 10, (err, hash) => {
            userModel.user.update({
                    password: hash
                }, {
                    where: {
                        token: token
                    },
                    sideEffects: false
                })
                .then((res) => {
                    if (res[0] > 0) {
                        callback({
                            status: 'success',
                            message: 'Updated password successfully.'
                        });  
                    userModel.user.update({token: null}, { where: {token: token}, sideEffects: false}).then((tokenDeleted) => {
                        log.info(`Token: ${token} deleted for user`);
                    }).catch(err => {
                        log.error('Error in deleting token '+err);
                    })
                    } else {
                        log.error('Tokens do not match');
                        callback({
                            status: 'failed',
                            error: true,
                            message: 'Link Invalid/Or expired. Please try again.'
                        });
                    }
                }).catch((err) => {
                    log.error('Error in updating password: ' + err);
                    callback({
                        error: true,
                        message: 'Error in password reset. Please try again..'
                    });
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

    createVisitor(userInserted, dob) {
        var visitor = {
            userId: userInserted.id,
            dob: dob,
            createdBy: userInserted.createdBy,
            updatedBy: userInserted.updatedBy
        };
        visitorDao.insert(visitor, (visitorInserted) => {});
    }

    getVisitorById(id, callback) {
        visitorDao.readById(id, (visitor) => {
            visitorService.readByVisitorIdHealth(visitor.userId, (visitorHealth) => {
                visitorService.getVisitorStoreById(visitor.userId, (visitorStores) => {
                    callback({
                        "patientInfo": visitor,
                        "visitorHealthInfo": visitorHealth,
                        "visitorStoreInfo": visitorStores
                    });
                });
            });
        });
    }

    updateVisitor(visitor, callback) {
        visitorDao.update(visitor, (updatedVisitor) => {
            visitorService.updateVisitorHealth(visitor); //update the visitor-health table
            visitorService.updateStore(visitor);
            callback(updatedVisitor);
        });
    }
}

export default UserService;