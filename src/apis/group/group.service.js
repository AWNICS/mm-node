import GroupDao from './group.dao';
import log from '../../config/log4js.config';
import GroupUserMapDao from '../../apis/group/groupUserMap.dao';
import Message from '../message/message.model';
import sequelize from '../../util/conn.mysql';
import groupUserMapModel from './index';
import groupModel from './index';
import userModel from '../user/index';
import UserService from '../user/user.service';
import DoctorService from '../doctor/doctor.service';
import visitorAppointmentModel from '../visitor/index';
import MessageService from '../message/message.service';
import AuditModel from '../audit/audit.model';
import AuditService from '../audit/audit.service';

const Promise = require('bluebird');

const groupDao = new GroupDao();
const groupUserMapDao = new GroupUserMapDao();
const userService = new UserService();
const doctorService = new DoctorService();
const messageService = new MessageService();
const auditService = new AuditService();

class GroupService {
    constructor() {}

    /**
     * CRUD for group
     */
    create(group, callback) {
        return groupDao.insert(group, (groupCreated) => {
            callback(groupCreated);
        });
    }

    getAll(callback) {
        return groupDao.readAll((allgroups) => {
            callback(allgroups);
        });
    }

    getById(id, callback) {
        return groupDao.readById(id, (groupById) => {
            callback(groupById);
        });
    }

    update(group, callback) {
        return groupDao.update(group, (groupUpdated) => {
            callback(groupUpdated);
        });
    }

    delete(id, callback) {
        return groupDao.delete(id, (groupDeleted) => {
            callback(groupDeleted);
        });
    }

    /**
     * CRUD for groupUser
     */
    createGroupUserMap(groupUser, callback) {
        return groupUserMapDao.insert(groupUser, (groupUserMapCreated) => {
            callback(groupUserMapCreated);
        });
    }

    getAllGroupUserMaps(callback) {
        return groupUserMapDao.readAll((allgroupUserMaps) => {
            callback(allgroupUserMaps);
        });
    }

    getGroupUserMapById(id, callback) {
        return groupUserMapDao.readById(id, (groupUserMapById) => {
            callback(groupUserMapById);
        });
    }

    updateGroupUserMap(groupUser, callback) {
        return groupUserMapDao.update(groupUser, (groupUserMapUpdated) => {
            callback(groupUserMapUpdated);
        });
    }

    deleteGroupUserMap(userId, groupId, callback) {
        return groupUserMapDao.delete(userId, groupId, (groupUserMapDeleted) => {
            callback(groupUserMapDeleted);
        });
    }

    /**
     * fetching all the groups for particular userId from group-user-map
     */
    getAllGroupsByUserId(userId) {
        return groupUserMapModel.group_user_map.findAll({
            where: {
                userId: userId
            }
        }).then((allGroupsByUserId) => {
            return Promise.map(allGroupsByUserId, groupUserMap => {
                return groupModel.group.findById(groupUserMap.groupId);
            });
        });
    }

    /**
     * fetching all the group's status for particular userId
     */
    async getGroupStatus(userId, callback) {
        var groupUserMaps = await groupUserMapModel.group_user_map.findAll({
            where: {
                userId: userId
            }
        });
        var gUMaps = await this.findUsers(groupUserMaps);
        var groupStatus = await this.findUserStatus(gUMaps, userId);
        var status = [];
        await groupStatus.map((grpStatus) => {
            status.push(this.filterGroups(grpStatus));
        });
        callback(status);
    }

    async findUsers(groupUserMaps) {
        var array = [];
        await groupUserMaps.map((groupUserMap) => {
            array.push(groupUserMapModel.group_user_map.findAll({
                where: {
                    groupId: groupUserMap.groupId
                }
            }));
        });
        return Promise.all(array);
    }

    findUserStatus(gUMaps, userId) {
        return Promise.all(
            gUMaps.map((gUMap) => {
                return Promise.all(gUMap.map((gum => {
                    if (gum.userId !== parseInt(userId)) {
                        return userModel.user.find({
                                where: { id: gum.userId }
                            })
                            .then((user) => {
                                if (user.status === 'online') {
                                    return groupModel.group.find({
                                            where: { id: gum.groupId }
                                        })
                                        .then((group) => {
                                            return groupModel.group.update({ status: 'online' }, {
                                                    where: {
                                                        id: group.id
                                                    }
                                                })
                                                .then(() => {
                                                    return groupModel.group.find({
                                                        where: {
                                                            id: group.id
                                                        }
                                                    });
                                                });
                                        });
                                } else {
                                    return;
                                }
                            });
                    } else {
                        return;
                    }
                })));
            })
        );
    }

    filterGroups(groups) {
        var index = -1;
        var arr_length = groups ? groups.length : 0;
        var resIndex = -1;
        var result = [];
        while (++index < arr_length) {
            var group = groups[index];
            if (group) {
                result[++resIndex] = group;
            }
        }
        return result;
    }

    /**
     * getting all users based on groupId 
     */
    getAllUsersByGroupId(groupId, callback) {
        return groupUserMapModel.group_user_map.findAll({
            where: {
                groupId: groupId
            }
        }).then((allUserIdsByGroupId) => {
            return Promise.map(allUserIdsByGroupId, groupUserMap => {
                return userService.getById(groupUserMap.userId, (res) => {
                    callback(res);
                });
            });
            // callback(res);
        });
    }

    /**
     * getting all users based on groupId 
     */

    getAllUserNamesByGroupId(groupId, callback) {
        return groupUserMapModel.group_user_map.findAll({
            where: {
                groupId: groupId
            }
        }).then((allUserIdsByGroupId) => {
            return Promise.map(allUserIdsByGroupId, groupUserMap => {
                return new Promise((resolve, reject) => {
                    userService.getById(groupUserMap.userId, (res, err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(res);
                    });
                })
            }).then((allUserData) => {
                var resp = [];
                allUserData.forEach((user) => { resp.push(user.firstname + ' ' + user.lastname) });
                callback(resp)
            });
        });
    }

    /**
     * get groups based on the group url
     */
    getGroupByUrl(url) {
        groupModel.group.findOne({
            where: {
                url: url
            }
        }).then((group) => {});
    }

    /**
     * group created by bot or doctor
     */
    createGroupAuto(group, receiverId, callback) {
        this.create(group, (createdGroup) => {
            callback(createdGroup);
            groupUserMapModel.group_user_map.findAll({
                where: { groupId: receiverId }
            }).then((allGroupUser) => {
                //map bot and user to created group
                for (var i = 0; i < allGroupUser.length; i++) {
                    var groupUserMap = {
                        groupId: createdGroup.id,
                        userId: allGroupUser[i].userId,
                        createdBy: createdGroup.createdBy,
                        updatedBy: createdGroup.updatedBy
                    }
                    this.createGroupUserMap(groupUserMap, (userMapped) => {});
                    userService.getById(allGroupUser[i].userId, (user) => {
                        if (user.role.toLowerCase() == 'bot') {
                            //create audit for this created group
                            var audit = new AuditModel({
                                senderId: user.id,
                                receiverId: createdGroup.id,
                                receiverType: 'group',
                                mode: 'Guided mode',
                                entityName: 'group',
                                entityEvent: 'added',
                                groupId: createdGroup.id,
                                createdBy: user.id,
                                updatedBy: user.id,
                                createdTime: Date.now(),
                                updatedTime: ''
                            });
                            auditService.create(audit, () => {});
                        }
                    });
                }
            });
            sequelize
                .query("select d.id from doctor d LEFT JOIN visitor_appointment va on d.id=va.doctorId where va.doctorId is NULL", { type: sequelize.QueryTypes.SELECT })
                .then((allDoctors) => {
                    if (allDoctors.length > 0) { //for new group
                        var doctorMap = { //mapping doctor to consultation
                            patientId: createdGroup.userId,
                            doctorId: allDoctors[0].id,
                            createdBy: createdGroup.createdBy,
                            updatedBy: createdGroup.updatedBy,
                            lastActive: Date.now()
                        }
                        doctorService.createConsultation(doctorMap, (consultationCreated) => {});
                        //mapping doctor to a group
                        var groupDoctorMap = {
                            groupId: createdGroup.id,
                            userId: allDoctors[0].id,
                            createdBy: createdGroup.createdBy,
                            updatedBy: createdGroup.updatedBy
                        }
                        this.createGroupUserMap(groupDoctorMap, (doctorMapped) => {});
                    } else { //for existing doctors
                        visitorAppointmentModel.visitor_appointment.findAll({
                                order: [
                                    ['lastActive', 'ASC']
                                ],
                                limit: 1
                            })
                            .then((allMappedDoctors) => {
                                var doctorMap = {
                                    patientId: createdGroup.userId,
                                    doctorId: allMappedDoctors[0].doctorId,
                                    createdBy: createdGroup.createdBy,
                                    updatedBy: createdGroup.updatedBy,
                                    lastActive: Date.now()
                                }
                                doctorService.createConsultation(doctorMap, (consultationCreated) => {});
                                //mapping doctor to a group
                                var groupDoctorMap = {
                                    groupId: createdGroup.id,
                                    userId: allMappedDoctors[0].doctorId,
                                    createdBy: createdGroup.createdBy,
                                    updatedBy: createdGroup.updatedBy
                                }
                                this.createGroupUserMap(groupDoctorMap, (doctorMapped) => {});
                                //update lastActive for this doctor
                                visitorAppointmentModel.visitor_appointment
                                    .update({ "lastActive": Date.now() }, { where: { doctorId: allMappedDoctors[0].doctorId } })
                                    .then((consultationUpdated) => {});
                            });
                    }
                });
        });
    }

    /**
     * create new group manually
     */
    createGroupManual(group, receiverId, doctorId, callback) {
        this.create(group, (createdGroup) => {
            callback(createdGroup);
            groupUserMapModel.group_user_map.findAll({
                where: { groupId: receiverId }
            }).then((allGroupUser) => {
                for (var i = 0; i < allGroupUser.length; i++) {
                    var groupUserMap = {
                        groupId: createdGroup.id,
                        userId: allGroupUser[i].userId,
                        createdBy: createdGroup.createdBy,
                        updatedBy: createdGroup.updatedBy
                    }
                    this.createGroupUserMap(groupUserMap, (userMapped) => {});
                    userService.getById(allGroupUser[i].userId, (user) => {
                        if (user.role.toLowerCase() == 'bot') {
                            //create audit for this created group
                            var audit = new AuditModel({
                                senderId: user.id,
                                receiverId: createdGroup.id,
                                receiverType: 'group',
                                mode: 'Guided mode',
                                entityName: 'group',
                                entityEvent: 'added',
                                groupId: createdGroup.id,
                                createdBy: user.id,
                                updatedBy: user.id,
                                createdTime: Date.now(),
                                updatedTime: ''
                            });
                            auditService.create(audit, () => {});
                        }
                    });
                }
            });
            //mapping doctor into consultation
            var doctorMap = {
                patientId: createdGroup.userId,
                doctorId: doctorId,
                createdBy: createdGroup.createdBy,
                updatedBy: createdGroup.updatedBy,
                lastActive: Date.now()
            }
            doctorService.createConsultation(doctorMap, (consultationCreated) => {});
            //mapping doctor to a group
            var groupDoctorMap = {
                groupId: createdGroup.id,
                userId: doctorId,
                createdBy: createdGroup.createdBy,
                updatedBy: createdGroup.updatedBy
            }
            this.createGroupUserMap(groupDoctorMap, (doctorMapped) => {});
        });
    }

    consultNow(doctorId, patientId, callback) {
        return sequelize
            .query(`
            SELECT
                ga.groupId
            FROM
                group_user_map AS ga, group_user_map AS gb
            WHERE
                ga.userId=${doctorId}
            AND
                gb.userId=${patientId}
            AND
                ga.groupId=gb.groupId;
                `, { type: sequelize.QueryTypes.SELECT })
            .then((result, err) => {
                if (err) {
                    log.error('Error while fetching doctors list ', err);
                    callback(err);
                } else {
                    if (result.length >= 1) {
                        this.getById(result[0].groupId, (existingGroup) => {
                            callback(existingGroup);
                        });
                    } else {
                        var group = {
                            name: 'Consultation',
                            url: `consultation/${patientId}`,
                            userId: patientId,
                            description: 'Consultation for registered patients',
                            picture: null,
                            createdBy: 'admin',
                            updatedBy: 'admin'
                        };
                        this.createGroupForConsultation(group, doctorId, patientId, (newGroup) => {
                            callback(newGroup);
                        });
                    }
                }
            });
    }

    createGroupForConsultation(group, doctorId, patientId, callback) {
        this.create(group, (createdGroup) => {
            callback(createdGroup);
            // mapping patient to the group
            var groupUserMap = {
                groupId: createdGroup.id,
                userId: patientId,
                createdBy: createdGroup.createdBy,
                updatedBy: createdGroup.updatedBy
            }
            this.createGroupUserMap(groupUserMap, (userMapped) => {});
            //mapping bot to the group and creating a new message
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
                        createdBy: createdGroup.createdBy,
                        updatedBy: createdGroup.updatedBy
                    };
                    groupUserMapDao.insert(groupUserMapBot, (createdGroupUserMap) => {});
                    var msg = {
                        receiverId: createdGroup.id,
                        receiverType: 'group', // group or individual
                        senderId: uId,
                        text: 'Welcome to Mesomeds! I am Medroid, your medical assistant. How may I assist you?',
                        createdTime: Date.now(),
                        updatedTime: Date.now()
                    };
                    messageService.sendMessage(msg, (result) => {});
                });
            //mapping doctor into consultation
            var doctorMap = {
                patientId: patientId,
                doctorId: doctorId,
                createdBy: createdGroup.createdBy,
                updatedBy: createdGroup.updatedBy,
                //lastActive: Date.now()
            };
            doctorService.createConsultation(doctorMap, (consultationCreated) => {});
        });
    }

    //we will need this code to update the group status on logout of the user
    /*async groupStatusUpdate(userId, callback) {
        var groups = await this.getAllGroupsByUserId(userId);
        var count = await this.getStatusCount(groups);
        console.log('count ', count);
    }

    getStatusCount(groups) {
        return Promise.all(groups.map((group) => {
            return groupUserMapModel.group_user_map.findAll({ where: { groupId: group.id } })
                .then((gUMaps) => {
                    var count = 0;
                    return Promise.all(gUMaps.map((gUMap) => {
                        return userService.getById(gUMap.userId, (user) => {
                            if (user.status === 'online') {
                                return ++count;
                            } else {
                                return;
                            }
                        });
                    }));
                    // console.log('count: ' + JSON.stringify(count[0]));
                    // if (count[0] < 2) {
                    //     groupService.update({ id: group.id, status: 'offline' }, () => {});
                    // } else {
                    //     return;
                    // }
                });
        }));
    }*/
}

export default GroupService;