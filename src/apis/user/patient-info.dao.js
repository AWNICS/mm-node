import patientInfoModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for patient-info api
 */
class PatientInfoDao {
    constructor() {}

    /**
     * insert method
     */
    insert(patientInfo, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                patientInfoModel.patient_info.create(patientInfo, { transaction: t }).then(function(insertedPatientInfo) {
                    callback(insertedPatientInfo);
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
        patientInfoModel.patient_info.findAll().then((patientInfo) => {
            callback(patientInfo);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        patientInfoModel.patient_info.findById(id).then((patientInfo) => {
            callback(patientInfo);
        });
    }

    /**
     * Update method
     */
    update(patientInfo, callback) {
        sequelize.transaction().then(function(t) {
            patientInfoModel.patient_info.update(patientInfo, {
                where: {
                    id: patientInfo.id
                }
            }, { transaction: t }).then(function(patientInfoUpdated) {
                callback(patientInfoUpdated);
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
            patientInfoModel.patient_info.destroy({
                where: {
                    id: id
                }
            }).then(function(patientInfo) {
                callback(patientInfo);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = PatientInfoDao;