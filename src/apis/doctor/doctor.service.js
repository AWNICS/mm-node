import DoctorDao from './doctor.dao';
import log from '../../config/log4js.config';

var doctorDao = new DoctorDao();

class DoctorService {
    constructor() {}

    create(doctor, callback) {
        return doctorDao.insert(doctor, callback);
    }

    getAll(callback) {
        return doctorDao.readAll(callback);
    }

    getById(id, callback) {
        return doctorDao.readById(id, callback);
    }

    update(doctor, callback) {
        return doctorDao.update(doctor, callback);
    }

    delete(id, callback) {
        return doctorDao.delete(id, callback);
    }
}

export default DoctorService;