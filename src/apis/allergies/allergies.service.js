import AllergiesDao from './allergies.dao';

const allergiesDao = new AllergiesDao();

class AllergiesService {

    create(allergies, callback) {
        allergiesDao.insert(allergies, callback);
    }

    readAll(callback) {
        allergiesDao.readAll(callback);
    }

    readById(id, callback) {
        allergiesDao.readById(id, callback);
    }

    remove(id, callback) {
        allergiesDao.delete(id, callback);
    }

    update(allergies, callback) {
        allergiesDao.update(allergies, callback);
    }
}

export default AllergiesService;