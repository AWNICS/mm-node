import doctorModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Doctor api
*/
class DoctorDao {
    constructor() {}

    /**
     * insert method
     */
    insert(doctor, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                doctorModel.Doctor.sync({ force: false }).then(function() {
                    return doctorModel.Doctor.create(doctor, { transaction: t }).then(function(doctorInserted) {
                        resolve(doctorInserted);
                        callback(doctorInserted);
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
            doctorModel.Doctor.findAll({ transaction: t }).then((allDoctor) => {
                callback(allDoctor);
            });
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                doctorModel.Doctor.findById(id, { transaction: t }).then((doctor) => {
                    resolve(doctor);
                    callback(doctor);
                });
            }, reject);
        });
    }

    /**
     * Update method
     */
    update(doctor, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                return doctorModel.Doctor.update(doctor, {
                    where: {
                        id: doctor.id
                    }
                }, { transaction: t }).then(function(doctorUpdated) {
                    resolve(doctorUpdated);
                    callback(doctorUpdated);
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
                doctorModel.Doctor.destroy({
                    where: {
                        id: id
                    }
                }).then(function(doctorDeleted) {
                    resolve(doctorDeleted);
                    callback(doctorDeleted);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            }, reject);
        });
    }
}

export default DoctorDao;