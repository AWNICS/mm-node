/**
 * 1. create
 * 2. 
 */

import groupCloneDao from './groupClone.dao';
import GroupCloneModel from './groupClone.model';

class GroupCloneService {
    constructor() {}

    createGroupClone(groupClone, callback) {
        var grp = new GroupCloneModel(groupClone);
        groupCloneDao.create(grp, callback);
    }

    readAllGroupClones(callback) {
        groupCloneDao.getAll(callback);
    }

    readGroupCloneById(id, callback) {
        groupCloneDao.getById(id, callback);
    }

    removeGroupClone(id, callback) {
        groupCloneDao.delete(id, callback);
    }

    updateGroupClone(group, callback) {
        groupCloneDao.update(group, callback);
    }
}

export default GroupCloneService;