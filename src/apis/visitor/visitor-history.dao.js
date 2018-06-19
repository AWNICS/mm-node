import visitorHistoryModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for patient-info api
 */
class VisitorHistoryDao {

    /**
     * insert method
     */
    insert(visitorHistory, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                visitorHistoryModel.visitor_history.create(visitorHistory, { transaction: t }).then(function(insertedVisitorHistory) {
                    callback(insertedVisitorHistory);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    log.error('error in visitorHistoryDao ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        visitorHistoryModel.visitor_history.findAll().then((visitorHistorys) => {
            callback(visitorHistorys);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        visitorHistoryModel.visitor_history.find({ where: { visitorId: id } }).then((visitorHistory) => {
            callback(visitorHistory);
        });
    }

    /**
     * Update method
     */
    update(visitorHistory, callback) {
        sequelize.transaction().then(function(t) {
            visitorHistoryModel.visitor_history.update(visitorHistory, {
                where: {
                    visitorId: visitorHistory.visitorId
                }
            }, { transaction: t }).then(function(visitorHistoryUpdated) {
                callback(visitorHistoryUpdated);
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
        sequelize.transaction().then(function(t) {
            visitorHistoryModel.visitor_history.destroy({
                where: {
                    id: id
                }
            }).then(function(visitorHistory) {
                callback(visitorHistory);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = VisitorHistoryDao;