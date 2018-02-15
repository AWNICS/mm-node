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

var Promise = require('bluebird');

var groupDao = new GroupDao();
var groupUserMapDao = new GroupUserMapDao();
var userService = new UserService();
var doctorService = new DoctorService();

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

    deleteGroupUserMap(id, callback) {
        return groupUserMapDao.delete(id, (groupUserMapDeleted) => {
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
    createNewGroup(group, receiverId, callback) {
        this.create(group, (createdGroup) => {
            callback(createdGroup);
            //incase of bot(manual, admin)
            //call getAllDoctors (pick one of them based on least assigned user)
            //get the details about the user based on the group.userId
            //call the consultationSchedule create to enter an entry to it

            //in case of doctor(auto)                                                                                            
            //call getAllBots (pick one of them)
            //get the details about the user based on the group.userId
            //call the consultationSchedule create to enter an entry to it
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
                }
            });
            sequelize
                .query("select d.id, d.name, count(cs.patientId) from doctor d LEFT JOIN  consultation_schedule cs on d.id=cs.patientId group by d.id order by count(cs.patientId) ASC limit 1", { type: sequelize.QueryTypes.SELECT })
                .then((allDoctors) => {
                    //mapping doctor into consultation
                    var doctorMap = {
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
                });
        });
    }

    /**
     * create new group manually
     */
    createNewGroupManually(group, receiverId, doctorId, callback) {
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

}

export default GroupService;