/**
 * 1. create
 * 2. 
 */

import groupDao from './group.dao';
import GroupModel from './group.model';

class GroupService {
    constructor() {}

    createGroup(group, callback) {
        var grp = new GroupModel(group);
        groupDao.create(grp, callback);
    }

    readAllGroups(callback) {
        groupDao.getAll(callback);
    }

    readGroupById(id, callback) {
        groupDao.getById(id, callback);
    }

    removeGroup(id, callback) {
        groupDao.delete(id, callback);
    }

    updateGroup(group, callback) {
        groupDao.update(group, callback);
    }
}

export default GroupService;