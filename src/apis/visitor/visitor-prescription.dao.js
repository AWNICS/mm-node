import visitorPrescriptionModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for visitor-prescription api
 */
class VisitorPrescriptionDao {

    /**
     * insert method
     */
    insert(visitorPrescription, callback) {
        sequelize.sync({
            force: false
        }).then(() => {
            sequelize.transaction().then(function (t) {
                visitorPrescriptionModel.visitor_prescription.create(visitorPrescription, {
                    transaction: t
                }).then(function (insertedVisitorPrescription) {
                    callback(insertedVisitorPrescription);
                }).then(function () {
                    t.commit();
                }).catch(function (error) {
                    log.error('error in visitorPrescriptionDao ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        visitorPrescriptionModel.visitor_prescription.findAll().then((visitorPrescriptions) => {
            callback(visitorPrescriptions);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        visitorPrescriptionModel.visitor_prescription.findAll({
            where: {
                visitorId: id
            }
        }).then((visitorPrescription) => {
            callback(visitorPrescription);
        });
    }

    /**
     * Update method
     */
    update(visitorPrescription, callback) {
        sequelize.transaction().then(function (t) {
            visitorPrescriptionModel.visitor_prescription.update(visitorPrescription, {
                where: {
                    visitorId: visitorPrescription.visitorId
                }
            }, {
                transaction: t
            }).then(function (visitorPrescriptionUpdated) {
                callback(visitorPrescriptionUpdated);
            }).then(function () {
                t.commit();
            }).catch(function (error) {
                log.error('Error while updating visitor prescription is dao: ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function (t) {
            visitorPrescriptionModel.visitor_prescription.destroy({
                where: {
                    id: id
                }
            }).then(function (visitorPrescription) {
                callback(visitorPrescription);
            }).then(function () {
                t.commit();
            }).catch(function (error) {
                t.rollback();
            });
        });
    }
}

module.exports = VisitorPrescriptionDao;