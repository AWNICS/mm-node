import visitorAppointmentModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for visitor-appointment api
 */
class VisitorAppointmentDao {

    /**
     * insert method
     */
    insert(visitorAppointment, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                visitorAppointmentModel.visitor_appointment.create(visitorAppointment, { transaction: t }).then(function(insertedVisitorAppointment) {
                    callback(insertedVisitorAppointment);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    log.error('error in visitorAppointmentDao ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        visitorAppointmentModel.visitor_appointment.findAll().then((visitorAppointments) => {
            callback(visitorAppointments);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        visitorAppointmentModel.visitor_appointment.find({ where: { visitorId: id } }).then((visitorAppointment) => {
            callback(visitorAppointment);
        });
    }

    /**
     * Update method
     */
    update(visitorAppointment, callback) {
        sequelize.transaction().then(function(t) {
            visitorAppointmentModel.visitor_appointment.update(visitorAppointment, {
                where: {
                    visitorId: visitorAppointment.visitorId
                }
            }, { transaction: t }).then(function(visitorAppointmentUpdated) {
                callback(visitorAppointmentUpdated);
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
            visitorAppointmentModel.visitor_appointment.destroy({
                where: {
                    id: id
                }
            }).then(function(visitorAppointment) {
                callback(visitorAppointment);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = VisitorAppointmentDao;