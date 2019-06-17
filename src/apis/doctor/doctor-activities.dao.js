import doctorActivityModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Doctor activity api
*/
class DoctorActivityDao {
    constructor() {
    }

    /**
     * insert method
     */
    insert(doctorActivity, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                doctorActivityModel.doctor_activities.create(doctorActivity, { transaction: t }).then(function(doctorActivityInserted) {
                    callback(doctorActivityInserted);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        doctorActivityModel.doctor_activities.findAll().then((allDoctorActivity) => {
            callback(allDoctorActivity);
        });
    }

    /**
     * read method based on id
     */
    readById(doctorId, callback) {
        console.log('limit')
        doctorActivityModel.doctor_activities.findAll({ where: { doctorId: doctorId }, limit: 10 }).then((doctorActivity) => {
            console.log(doctorActivity);
            callback(doctorActivity);
        });
    }

    /**
     * Update method
     */
    update(doctorActivity, callback) {
        sequelize.transaction().then(function(t) {
            doctorActivityModel.doctor_activities.update(doctorActivity, {
                where: {
                    id: doctorActivity.id
                }
            }, { transaction: t }).then(function(doctorActivityUpdated) {
                callback(doctorActivityUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.error('Error in doctor activity dao update ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            doctorActivityModel.doctor_activities.destroy({
                where: {
                    id: id
                }
            }).then(function(doctorActivityDeleted) {
                callback(doctorActivityDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default DoctorActivityDao;