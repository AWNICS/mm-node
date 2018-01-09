import GroupDao from './group.dao';
import log from '../../config/log4js.config';
import GroupUserMapDao from '../../apis/group/groupUserMap.dao';
import Message from '../message/message.model';
import sequelize from '../../util/conn.mysql';
import groupUserMapModel from './index';

var groupDao = new GroupDao();
var groupUserMapDao = new GroupUserMapDao();

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
        return groupUserMapDao.insert(groupUser, callback).then((result) => {});
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
    getAllGroupsByUserId(userId, callback) {
        return sequelize.transaction().then(function(t) {
            groupUserMapModel.GroupUserMap.findAll({
                where: {
                    userId: userId
                },
                transaction: t
            }).then((allGroupsByUserId) => {
                for (var i in allGroupsByUserId) {
                    console.log(allGroupsByUserId[i].groupId);
                }
                callback(allGroupsByUserId);
            });
        });
    }

    /**
     * render 100 message onclick of any group
     */
    getLimitedMessages(receiverId, senderId, callback) {
        Message.find({ receiverId: receiverId }, (err, messages) => {
            if (err) throw err;
            log.info('value: ' + JSON.stringify(messages));
            callback(messages);
        }).sort({ $natural: -1 }).limit(2);
    }
}

export default GroupService;