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
        sequelize.transaction().then(function(t) {
            contactUsModel.contact.create(contact, { transaction: t }).then(function(contactInserted) {
                callback(contactInserted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        sequelize.transaction().then(function(t) {
            contactUsModel.contact.findAll({ transaction: t }).then((allContact) => {
                callback(allContact);
            });
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        sequelize.transaction().then(function(t) {
            contactUsModel.contact.findById(id, { transaction: t }).then((contact) => {
                callback(contact);
            });
        });
    }

    /**
     * Update method
     */
    update(contact, callback) {
        sequelize.transaction().then(function(t) {
            contactUsModel.contact.update(contact, {
                where: {
                    id: contact.id
                }
            }, { transaction: t }).then(function(contactUpdated) {
                callback(contactUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            contactUsModel.contact.destroy({
                where: {
                    id: id
                }
            }).then(function(contactDeleted) {
                callback(contactDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = ContactDao;