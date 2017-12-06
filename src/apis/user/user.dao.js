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
    insert(req, res) {
        var user = {
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            picUrl: req.body.picUrl,
            description: req.body.description,
            status: req.body.status,
            waitingTime: req.body.waitingTime,
            rating: req.body.rating
        };
        return sequelize.transaction().then(function(t) {
            userModel.User.sync({ force: false }).then(function() {
                return userModel.User.create(user, { transaction: t }).then(function(user) {
                    res.send('User created: ' + JSON.stringify(user));
                }).then(function() {
                    return t.commit();
                    //return t.rollback();
                }).catch(function(error) {
                    return t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(req, res) {
        return sequelize.transaction().then(function(t) {
            userModel.User.findAll({ transaction: t }).then((user) => {
                res.send('All user: ' + JSON.stringify(user));
            });
        });
    }

    /**
     * read method based on id
     */
    readById(req, res) {
        return sequelize.transaction().then(function(t) {
            userModel.User.findById(req.params.id, { transaction: t }).then((user) => {
                res.send('user by id: ' + JSON.stringify(user));
            });
        });
    }

    /**
     * Update method
     */
    update(req, res) {
        var user = {
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            picUrl: req.body.picUrl,
            description: req.body.description,
            status: req.body.status,
            waitingTime: req.body.waitingTime,
            rating: req.body.rating
        };
        return sequelize.transaction().then(function(t) {
            userModel.User.update(user, {
                where: {
                    id: req.params.id
                }
            }, { transaction: t }).then(function(user) {
                res.send('updated user: ' + req.params.id);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                return t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(req, res) {
        return sequelize.transaction().then(function(t) {
            userModel.User.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function(user) {
                res.send('deleted user id: ' + req.params.id);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                return t.rollback();
            });
        });
    }
}

module.exports = UserDao;