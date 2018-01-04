/**
 * 1. create
 * 2. 
 */

import specialitiesDao from './specialities.dao';
import Speciality from './specialities.model';

class SpecialitiesService {
    constructor() {}

    createSpeciality(speciality, callback) {
        var spec = new Speciality(speciality);
        specialitiesDao.create(spec, callback);
    }

    readAllSpecialities(callback) {
        specialitiesDao.getAll(callback);
    }

    readSpecialityById(id, callback) {
        specialitiesDao.getById(id, callback);
    }

    removeSpeciality(id, callback) {
        specialitiesDao.delete(id, callback);
    }

    updateSpeciality(speciality, callback) {
        specialitiesDao.update(speciality, callback);
    }
}

export default SpecialitiesService;