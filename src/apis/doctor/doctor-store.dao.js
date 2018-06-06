import doctorStoreModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for DoctorStore api
*/
class DoctorStoreDao {

    /**
     * insert method
     */
    insert(doctorStore, callback) {
        sequelize.sync({ force: false }).then(() => {
            return sequelize.transaction(function(t) {
                return doctorStoreModel.doctor_store
                    .create(doctorStore, { transaction: t })
                    .then(function(doctorStoreCreated) {
                        callback(doctorStoreCreated);
                    });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        return doctorStoreModel.doctor_store
            .findAll()
            .then((doctorStores) => {
                callback(doctorStores);
            });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        return doctorStoreModel.doctor_store
            .findById(id)
            .then((doctorStore) => {
                callback(doctorStore);
            });
    }

    /**
     * Update method
     */
    update(doctorStore, id, type, callback) {
        return sequelize.transaction(function(t) {
            return doctorStoreModel.doctor_store
                .update(doctorStore, {
                    where: {
                        id: id,
                        type: type
                    }
                }, { transaction: t })
                .then(function(updatedDoctorStore) {
                    callback(updatedDoctorStore);
                });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        return sequelize.transaction(function(t) {
            return doctorStoreModel.doctor_store
                .destroy({
                    where: {
                        id: id
                    }
                }).then(function(deletedDoctorStore) {
                    callback(deletedDoctorStore);
                });
        });
    }
}

export default DoctorStoreDao;