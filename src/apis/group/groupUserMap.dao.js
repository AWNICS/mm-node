import groupUserMapModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for GroupUserMapDao api
*/
class GroupUserMapDao {
    constructor() {}

    /**
     * insert method
     */
    insert(groupUser, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                groupUserMapModel.GroupUser.sync({ force: false }).then(function() {
                    return groupUserMapModel.GroupUser.create(groupUser, { transaction: t }).then(function(groupUserInserted) {
                        resolve(groupUserInserted);
                        callback(groupUserInserted);
                    }).then(function() {
                        t.commit();
                    }).catch(function(error) {
                        t.rollback();
                    });
                }, reject);
            }, reject);
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        return sequelize.transaction().then(function(t) {
            groupUserMapModel.GroupUser.findAll({ transaction: t }).then((allGroupUser) => {
                callback(allGroupUser);
            });
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                groupUserMapModel.GroupUser.findById(id, { transaction: t }).then((group) => {
                    resolve(group);
                    callback(group);
                });
            }, reject);
        });
    }

    /**
     * Update method
     */
    update(groupUser, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                return groupUserMapModel.GroupUser.update(groupUser, {
                    where: {
                        id: groupUser.id
                    }
                }, { transaction: t }).then(function(groupUserUpdated) {
                    resolve(groupUserUpdated);
                    callback(groupUserUpdated);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            }, reject);
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                groupUserMapModel.GroupUser.destroy({
                    where: {
                        id: id
                    }
                }).then(function(groupUserDeleted) {
                    resolve(groupUserDeleted);
                    callback(groupUserDeleted);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            }, reject);
        });
    }
}

export default GroupUserMapDao;