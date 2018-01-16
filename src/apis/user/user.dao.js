import userModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for user api
 */
class UserDao {
    constructor() {}

    /**
     * insert method
     */
    insert(user, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                userModel.User.sync({ force: false }).then(function() {
                    return userModel.User.create(user, { transaction: t }).then(function(userInserted) {
                        resolve(userInserted);
                        callback(userInserted);
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
            userModel.User.findAll({ transaction: t }).then((user) => {
                //log.info('All users: ' + JSON.stringify(user));
                callback(user);
            });
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                userModel.User.findById(id, { transaction: t }).then((user) => {
                    //log.info('By id ' + JSON.stringify(user));
                    resolve(user);
                    callback(user);
                });
            }, reject);
        });
    }

    /**
     * Update method
     */
    update(user, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                return userModel.User.update(user, {
                    where: {
                        id: user.id
                    }
                }, { transaction: t }).then(function(userUpdated) {
                    resolve(userUpdated);
                    log.info('updated ' + JSON.stringify(userUpdated));
                    callback(userUpdated);
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
                userModel.User.destroy({
                    where: {
                        id: id
                    }
                }).then(function(user) {
                    log.info('user deleted: ' + JSON.stringify(user));
                    resolve(user);
                    log.info('deleted ' + JSON.stringify(user));
                    callback(user);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            }, reject);
        });
    }
}

module.exports = UserDao;