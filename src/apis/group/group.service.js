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
        return groupDao.insert(group, callback);
    }

    getAll(callback) {
        return groupDao.readAll(callback);
    }

    getById(id, callback) {
        return groupDao.readById(id, callback);
    }

    update(group, callback) {
        return groupDao.update(group, callback);
    }

    delete(id, callback) {
        return groupDao.delete(id, callback);
    }

    /**
     * CRUD for groupUser
     */
    createGroupUserMap(groupUser, callback) {
        return groupUserMapDao.insert(groupUser, callback);
    }

    getAllGroupUserMaps(callback) {
        return groupUserMapDao.readAll(callback);
    }

    getGroupUserMapById(id, callback) {
        return groupUserMapDao.readById(id, callback);
    }

    updateGroupUserMap(groupUser, callback) {
        return groupUserMapDao.update(groupUser, callback);
    }

    deleteGroupUserMap(id, callback) {
        return groupUserMapDao.delete(id, callback);
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
                    return groupModel.Group.findById(groupUserMap.groupId);
                });
            });
        });
    }

    /**
     * getting all users based on groupId 
     */
    getAllUsersByGroupId(groupId) {
        return sequelize.transaction().then(function(t) {
            return groupUserMapModel.group_user_map.findAll({
                where: {
                    groupId: groupId
                },
                transaction: t
            }).then((allUsersByGroupId) => {
                return Promise.map(allUsersByGroupId, groupUserMap => {
                    return userService.getById(groupUserMap.userId, (res) => {});
                });
            });
        });
    }

    /**
     * get groups based on the group url
     */
    getGroupByUrl(url) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                groupModel.Group.findOne({
                    where: {
                        url: url
                    }
                }, { transaction: t }).then((group) => {
                    resolve(group);
                    //callback(group);
                });
            }, reject);
        });
    }
}

export default GroupService;