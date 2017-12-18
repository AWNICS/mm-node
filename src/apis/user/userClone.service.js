/**
 * 1. create
 * 2. 
 */

import userCloneDao from './userClone.dao';
import UserClone from './userClone.model';

class UserCloneService {
    constructor() {}

    createUserClone(userClone, callback) {
        var usrClone = new UserClone(userClone);
        userCloneDao.create(usrClone, callback);
    }

    readAllUserClones(callback) {
        userCloneDao.getAll(callback);
    }

    readUserCloneById(id, callback) {
        userCloneDao.getById(id, callback);
    }

    removeUserClone(id, callback) {
        userCloneDao.delete(id, callback);
    }

    updateUserClone(userClone, callback) {
        userCloneDao.update(userClone, callback);
    }
}

export default UserCloneService;