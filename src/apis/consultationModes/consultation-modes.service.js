import ConsultationModesDao from './consultation-modes.dao';

const consultationModesDao = new ConsultationModesDao();

class ConsultationModesService {

    create(consultationMode, callback) {
        consultationModesDao.insert(consultationMode, callback);
    }

    readAll(callback) {
        consultationModesDao.readAll(callback);
    }

    readById(id, callback) {
        consultationModesDao.readById(id, callback);
    }

    remove(id, callback) {
        consultationModesDao.delete(id, callback);
    }

    update(consultationMode, callback) {
        consultationModesDao.update(consultationMode, callback);
    }
}

export default ConsultationModesService;