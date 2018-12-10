import visitorReportModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for visitor-report api
 */
class VisitorReportDao {

    /**
     * insert method
     */
    insert(visitorReport, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                visitorReportModel.visitor_report.create(visitorReport, { transaction: t }).then(function(insertedVisitorReport) {
                    callback(insertedVisitorReport);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    log.error('error in visitorReportDao ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        visitorReportModel.visitor_report.findAll().then((visitorReports) => {
            callback(visitorReports);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        visitorReportModel.visitor_report.findAll({
                where: { visitorId: id },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then((visitorReport) => {
                callback(visitorReport);
            });
    }

    /**
     * Update method
     */
    update(visitorReport, callback) {
        sequelize.transaction().then(function(t) {
            visitorReportModel.visitor_report.update(visitorReport, {
                where: {
                    visitorId: visitorReport.visitorId
                }
            }, { transaction: t }).then(function(visitorReportUpdated) {
                callback(visitorReportUpdated);
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
            visitorReportModel.visitor_report.destroy({
                where: {
                    id: id
                }
            }).then(function(visitorReport) {
                callback(visitorReport);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = VisitorReportDao;