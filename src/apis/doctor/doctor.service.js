import DoctorDao from './doctor.dao';
import log from '../../config/log4js.config';

var doctorDao = new DoctorDao();

class DoctorService {
    constructor() {}

    create(doctor, callback) {
        doctorDao.insert(doctor, callback).then((doctorInserted) => {});
    }

    getAll(callback) {
        doctorDao.readAll(callback);
    }

    getById(id, callback) {
        doctorDao.readById(id, callback);
    }

    updateDoctor(doctor, callback) {
        doctorDao.update(doctor, callback);
    }

    deleteDoctor(id, callback) {
        doctorDao.delete(id, callback);
    }
}

export default DoctorService;