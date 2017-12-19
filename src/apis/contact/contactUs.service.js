import ContactDao from './contactUs.dao';
import log from '../../config/log4js.config';

var contactDao = new ContactDao();
/*
the service layer goes here(logics apart from CRUD methods)
*/
class ContactService {
    constructor() {}

    create(contact, callback) {
        contactDao.insert(contact, callback).then((contactInserted) => {});
    }

    getAll(callback) {
        contactDao.readAll(callback);
    }

    getById(id, callback) {
        contactDao.readById(id, callback);
    }

    updateContact(contact, callback) {
        contactDao.update(contact, callback);
    }

    deleteContact(id, callback) {
        contactDao.delete(id, callback);
    }
}

export default ContactService;