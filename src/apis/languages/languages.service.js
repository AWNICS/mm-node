import LanguagesDao from './languages.dao';

const languagesDao = new LanguagesDao();

class LanguagesService {

    create(language, callback) {
        languagesDao.insert(language, callback);
    }

    readAll(callback) {
        languagesDao.readAll(callback);
    }

    readById(id, callback) {
        languagesDao.readById(id, callback);
    }

    remove(id, callback) {
        languagesDao.delete(id, callback);
    }

    update(language, callback) {
        languagesDao.update(language, callback);
    }
}

export default LanguagesService;