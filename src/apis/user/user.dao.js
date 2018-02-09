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
        sequelize.transaction().then(function(t) {
            userModel.user.create(user, { transaction: t }).then(function(userInserted) {
                callback(userInserted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        return sequelize.transaction().then(function(t) {
            userModel.user.findAll({ transaction: t }).then((user) => {
                callback(user);
            });
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        return sequelize.transaction().then(function(t) {
            userModel.user.findById(id, { transaction: t }).then((user) => {
                callback(user);
            });
        });
    }

    /**
     * Update method
     */
    update(user, callback) {
        return sequelize.transaction().then(function(t) {
            return userModel.user.update(user, {
                where: {
                    id: user.id
                }
            }, { transaction: t }).then(function(userUpdated) {
                callback(userUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        return sequelize.transaction().then(function(t) {
            userModel.user.destroy({
                where: {
                    id: id
                }
            }).then(function(user) {
                callback(user);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = UserDao;