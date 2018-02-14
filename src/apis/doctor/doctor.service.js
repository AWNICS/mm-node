import DoctorDao from './doctor.dao';
import log from '../../config/log4js.config';

var doctorDao = new DoctorDao();

class DoctorService {
    constructor() {}

    create(doctor, callback) {
        return doctorDao.insert(doctor, (doctorInserted) => {
            callback(doctorInserted);
        });
    }

    getAll(callback) {
        return doctorDao.readAll((allDoctors) => {
            callback(allDoctors);
        });
    }

    getById(id, callback) {
        return doctorDao.readById(id, (doctorById) => {
            callback(doctorById);
        });
    }

    update(doctor, callback) {
        return doctorDao.update(doctor, (doctorUpdated) => {
            callback(doctorUpdated);
        });
    }

    delete(id, callback) {
        return doctorDao.delete(id, (doctorDeleted) => {
            callback(doctorDeleted);
        });
    }
}

export default DoctorService;