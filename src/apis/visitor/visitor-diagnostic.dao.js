import visitorDiagnosticModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for visitor-diagnostic api
 */
class VisitorDiagnosticDao {

    /**
     * insert method
     */
    insert(visitorDiagnostic, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                visitorDiagnosticModel.visitor_diagnostic.create(visitorDiagnostic, { transaction: t }).then(function(insertedVisitorDiagnostic) {
                    callback(insertedVisitorDiagnostic);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    log.error('error in visitorDiagnosticDao ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        visitorDiagnosticModel.visitor_diagnostic.findAll().then((visitorDiagnostics) => {
            callback(visitorDiagnostics);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        visitorDiagnosticModel.visitor_diagnostic.find({ where: { visitorId: id } }).then((visitorDiagnostic) => {
            callback(visitorDiagnostic);
        });
    }

    /**
     * Update method
     */
    update(visitorDiagnostic, callback) {
        sequelize.transaction().then(function(t) {
            visitorDiagnosticModel.visitor_diagnostic.update(visitorDiagnostic, {
                where: {
                    visitorId: visitorDiagnostic.visitorId
                }
            }, { transaction: t }).then(function(visitorDiagnosticUpdated) {
                callback(visitorDiagnosticUpdated);
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
            visitorDiagnosticModel.visitor_diagnostic.destroy({
                where: {
                    id: id
                }
            }).then(function(visitorDiagnostic) {
                callback(visitorDiagnostic);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = VisitorDiagnosticDao;