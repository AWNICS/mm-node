import QualificationsDao from './qualifications.dao';

const qualificationsDao = new QualificationsDao();

class ConsultationModesService {

    create(qualification, callback) {
        qualificationsDao.insert(qualification, callback);
    }

    readAll(callback) {
        qualificationsDao.readAll(callback);
    }

    readById(id, callback) {
        qualificationsDao.readById(id, callback);
    }

    remove(id, callback) {
        qualificationsDao.delete(id, callback);
    }

    update(qualification, callback) {
        qualificationsDao.update(qualification, callback);
    }
}

export default ConsultationModesService;