import doctorScheduleModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for DoctorSchedule api
*/
class DoctorScheduleDao {

    /**
     * insert method
     */
    insert(doctorSchedule, callback) {
        sequelize.sync({ force: false }).then(() => {
            return sequelize.transaction(function(t) {
                return doctorScheduleModel.doctor_schedule
                    .create(doctorSchedule, { transaction: t })
                    .then(function(doctorScheduleCreated) {
                        callback(doctorScheduleCreated);
                    });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        return doctorScheduleModel.doctor_schedule
            .findAll()
            .then((doctorSchedules) => {
                callback(doctorSchedules);
            });
    }

    /**
     * read method based on id
     */
    readById(doctorId, callback) {
        return doctorScheduleModel.doctor_schedule
            .findAll({ where: { doctorId: doctorId } })
            .then((doctorSchedule) => {
                callback(doctorSchedule);
            });
    }

    /**
     * Update method
     */
    update(doctorSchedule, callback) {
        return sequelize.transaction(function(t) {
            return doctorScheduleModel.doctor_schedule
                .update(doctorSchedule, {
                    where: {
                        id: doctorSchedule.id
                    }
                }, { transaction: t })
                .then(function(updatedDoctorSchedule) {
                    callback(updatedDoctorSchedule);
                });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        return sequelize.transaction(function(t) {
            return doctorScheduleModel.doctor_schedule
                .destroy({
                    where: {
                        id: id
                    }
                }).then(function(deletedDoctorSchedule) {
                    callback(deletedDoctorSchedule);
                });
        });
    }
}

export default DoctorScheduleDao;