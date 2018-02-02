import groupModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Doctor api
*/
class GroupDao {
    constructor() {}

    /**
     * insert method
     */
    insert(group, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                groupModel.Group.sync({ force: false }).then(function() {
                    return groupModel.Group.create(group, { transaction: t }).then(function(groupInserted) {
                        resolve(groupInserted);
                        callback(groupInserted);
                    }).then(function() {
                        t.commit();
                    }).catch(function(error) {
                        t.rollback();
                    });
                }, reject).catch(err => console.log('err: ' + err));
            }, reject).catch(err => console.log('err: ' + err));
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        return sequelize.transaction().then(function(t) {
            groupModel.Group.findAll({ transaction: t }).then((allGroup) => {
                callback(allGroup);
            });
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                groupModel.Group.findById(id, { transaction: t }).then((group) => {
                    resolve(group);
                    callback(group);
                });
            }, reject);
        });
    }

    /**
     * Update method
     */
    update(group, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                return groupModel.Group.update(group, {
                    where: {
                        id: group.id
                    }
                }, { transaction: t }).then(function(groupUpdated) {
                    resolve(groupUpdated);
                    callback(groupUpdated);
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
                groupModel.Group.destroy({
                    where: {
                        id: id
                    }
                }).then(function(groupDeleted) {
                    resolve(groupDeleted);
                    callback(groupDeleted);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            }, reject);
        });
    }
}

export default GroupDao;