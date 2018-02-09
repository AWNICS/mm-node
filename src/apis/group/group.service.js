import GroupDao from './group.dao';
import log from '../../config/log4js.config';
import GroupUserMapDao from '../../apis/group/groupUserMap.dao';
import Message from '../message/message.model';
import sequelize from '../../util/conn.mysql';
import groupUserMapModel from './index';
import groupModel from './index';
import userModel from '../user/index';
import UserService from '../user/user.service';

var Promise = require('bluebird');

var groupDao = new GroupDao();
var groupUserMapDao = new GroupUserMapDao();
var userService = new UserService();

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
        return sequelize.transaction().then(function(t) {
            return groupUserMapModel.group_user_map.findAll({
                where: {
                    userId: userId
                },
                transaction: t
            }).then((allGroupsByUserId) => {
                return Promise.map(allGroupsByUserId, groupUserMap => {
                    return groupModel.group.findById(groupUserMap.groupId);
                });
            });
        });
    }

    /**
     * getting all users based on groupId 
     */
    getAllUsersByGroupId(groupId, callback) {
        return sequelize.transaction().then(function(t) {
            return groupUserMapModel.group_user_map.findAll({
                where: {
                    groupId: groupId
                },
                transaction: t
            }).then((allUserIdsByGroupId) => {
                return Promise.map(allUserIdsByGroupId, groupUserMap => {
                    return userService.getById(groupUserMap.userId, (res) => {
                        callback(res);
                    });
                });
                // callback(res);
            });
        });
    }

    /**
     * get groups based on the group url
     */
    getGroupByUrl(url) {
        return sequelize.transaction().then(function(t) {
            groupModel.group.findOne({
                where: {
                    url: url
                }
            }, { transaction: t }).then((group) => {});
        });
    }
}

export default GroupService;