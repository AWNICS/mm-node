import SpecialitiesDao from './specialities.dao';

const specialitiesDao = new SpecialitiesDao();

class SpecialitiesService {

    create(speciality, callback) {
        specialitiesDao.insert(speciality, callback);
    }

    readAll(callback) {
        specialitiesDao.readAll(callback);
    }

    readById(id, callback) {
        specialitiesDao.readById(id, callback);
    }

    remove(id, callback) {
        specialitiesDao.delete(id, callback);
    }

    update(speciality, callback) {
        specialitiesDao.update(speciality, callback);
    }
}

export default SpecialitiesService;