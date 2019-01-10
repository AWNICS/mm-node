import visitorHealthModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for visitor-health api
 */
class VisitorHealthDao {

    /**
     * insert method
     */
    insert(visitorHealth, callback) {
        sequelize.sync({
            force: false
        }).then(() => {
            sequelize.transaction().then(function (t) {
                visitorHealthModel.visitor_health.create(visitorHealth, {
                    transaction: t
                }).then(function (insertedVisitorHealth) {
                    callback(insertedVisitorHealth);
                }).then(function () {
                    t.commit();
                }).catch(function (error) {
                    log.error('error in visitorHealthDao ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        visitorHealthModel.visitor_health.findAll().then((visitorHealths) => {
            callback(visitorHealths);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        visitorHealthModel.visitor_health.findAll({
            where: {
                visitorId: id
            }
        }).then((visitorHealth) => {
            callback(visitorHealth);
        });
    }

    /**
     * Update method
     */
    update(visitorHealth, callback) {
        sequelize.transaction().then(function (t) {
            visitorHealthModel.visitor_health.update(visitorHealth, {
                where: {
                    visitorId: visitorHealth.userId
                }
            }, {
                transaction: t
            }).then(function (visitorHealthUpdated) {
                callback(visitorHealthUpdated);
            }).then(function () {
                t.commit();
            }).catch(function (error) {
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function (t) {
            visitorHealthModel.visitor_health.destroy({
                where: {
                    id: id
                }
            }).then(function (visitorHealth) {
                callback(visitorHealth);
            }).then(function () {
                t.commit();
            }).catch(function (error) {
                t.rollback();
            });
        });
    }
}

module.exports = VisitorHealthDao;