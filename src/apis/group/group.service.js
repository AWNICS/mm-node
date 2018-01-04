import GroupDao from './group.dao';
import log from '../../config/log4js.config';
import GroupUserMapDao from '../../apis/group/groupUserMap.dao';
import groupCloneDao from './groupClone.dao';
import GroupCloneModel from './groupClone.model';
import groupUserMapCloneDao from './groupUserMapClone.dao';
import GroupUserMapCloneModel from './groupUserMapClone.model';

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
    createGroupUser(groupUser, callback) {
        return groupUserMapDao.insert(groupUser, callback).then((result) => {});
    }

    getAllGroupUser(callback) {
        return groupUserMapDao.readAll(callback);
    }

    getByIdGroupUser(id, callback) {
        return groupUserMapDao.readById(id, callback);
    }

    updateGroupUser(groupUser, callback) {
        return groupUserMapDao.update(groupUser, callback);
    }

    deleteGroupUser(id, callback) {
        return groupUserMapDao.delete(id, callback);
    }

    /**
     * for group clone
     */
    createObj(groupClone, callback) {
        var grp = new GroupCloneModel(groupClone);
        groupCloneDao.create(grp, callback);
    }

    readAllObj(callback) {
        groupCloneDao.getAll(callback);
    }

    readByIdObj(id, callback) {
        groupCloneDao.getById(id, callback);
    }

    deleteObj(id, callback) {
        groupCloneDao.delete(id, callback);
    }

    updateObj(group, callback) {
        groupCloneDao.update(group, callback);
    }

    /**
     * for groupUserMap clone
     */
    createGroupUserMapObj(groupUserMapClone, callback) {
        var grp = new GroupUserMapCloneModel(groupUserMapClone);
        groupUserMapCloneDao.create(grp, callback);
    }

    readAllGroupUserMapObj(callback) {
        groupUserMapCloneDao.getAll(callback);
    }

    readByIdGroupUserMapObj(id, callback) {
        groupUserMapCloneDao.getById(id, callback);
    }

    deleteGroupUserMapObj(id, callback) {
        groupUserMapCloneDao.delete(id, callback);
    }

    updateGroupUserMapObj(group, callback) {
        groupUserMapCloneDao.update(group, callback);
    }

    /**
     * fetching all the groups for particular userId
     */
    /*getAllGroupsBasedOnUserId(userId) {
        var result = groupCloneDao.getAll(callback);
        log.info(JSON.stringify(result));
        //var groupList = [];
        log.info('List of groups: ');
        for (var i = 0; i < result.length; i++) {
            if (result.userId == userId) {
                //groupList[0] = result.name;
                log.info(result.name + ' ');
            }
        }
    }*/
}

export default GroupService;