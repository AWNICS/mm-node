import doctorMediaModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for DoctorMedia api
*/
class DoctorMediaDao {

    /**
     * insert method
     */
    insert(doctorMedia, callback) {
        sequelize.sync({ force: false }).then(() => {
            return sequelize.transaction(function(t) {
                return doctorMediaModel.doctor_media
                    .create(doctorMedia, { transaction: t })
                    .then(function(doctorMediaCreated) {
                        callback(doctorMediaCreated);
                    });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        return doctorMediaModel.doctor_media
            .findAll()
            .then((doctorMedias) => {
                callback(doctorMedias);
            });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        return doctorMediaModel.doctor_media
            .findById(id)
            .then((doctorMedia) => {
                callback(doctorMedia);
            });
    }

    /**
     * Update method
     */
    update(doctorMedia, id, callback) {
        return sequelize.transaction(function(t) {
            return doctorMediaModel.doctor_media
                .update(doctorMedia, {
                    where: {
                        id: id
                    }
                }, { transaction: t })
                .then(function(updatedDoctorMedia) {
                    callback(updatedDoctorMedia);
                });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        return sequelize.transaction(function(t) {
            return doctorMediaModel.doctor_media
                .destroy({
                    where: {
                        id: id
                    }
                }).then(function(deletedDoctorMedia) {
                    callback(deletedDoctorMedia);
                });
        });
    }
}

export default DoctorMediaDao;