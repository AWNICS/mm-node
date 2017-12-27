import contactUsModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for ContactUs api
 */
class ContactDao {
    constructor() {}

    /**
     * insert method
     */
    insert(contact, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                contactUsModel.Contact.sync({ force: false }).then(function() {
                    return contactUsModel.Contact.create(contact, { transaction: t }).then(function(contactInserted) {
                        resolve(contactInserted);
                        callback(contactInserted);
                    }).then(function() {
                        t.commit();
                    }).catch(function(error) {
                        t.rollback();
                    });
                }, reject);
            }, reject);
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        return sequelize.transaction().then(function(t) {
            contactUsModel.Contact.findAll({ transaction: t }).then((allContact) => {
                callback(allContact);
            });
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                contactUsModel.Contact.findById(id, { transaction: t }).then((contact) => {
                    resolve(contact);
                    callback(contact);
                });
            }, reject);
        });
    }

    /**
     * Update method
     */
    update(contact, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                return contactUsModel.Contact.update(contact, {
                    where: {
                        id: contact.id
                    }
                }, { transaction: t }).then(function(contactUpdated) {
                    resolve(contactUpdated);
                    callback(contactUpdated);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            }, reject);
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                contactUsModel.Contact.destroy({
                    where: {
                        id: id
                    }
                }).then(function(contactDeleted) {
                    resolve(contactDeleted);
                    callback(contactDeleted);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            }, reject);
        });
    }
}

module.exports = ContactDao;