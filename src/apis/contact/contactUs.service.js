import ContactDao from './contactUs.dao';
import log from '../../config/log4js.config';

var contactDao = new ContactDao();
/*
the service layer goes here(logics apart from CRUD methods)
*/
class ContactService {
    constructor() {}

    create(contact, callback) {
        return contactDao.insert(contact, callback);
    }

    getAll(callback) {
        return contactDao.readAll(callback);
    }

    getById(id, callback) {
        return contactDao.readById(id, callback);
    }

    update(contact, callback) {
        return contactDao.update(contact, callback);
    }

    delete(id, callback) {
        return contactDao.delete(id, callback);
    }
}

export default ContactService;