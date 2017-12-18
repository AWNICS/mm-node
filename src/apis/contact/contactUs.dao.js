import contactModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for user api
 */
class ContactDao {
    constructor() {}

    /**
     * insert method
     */
    insert(req, res) {
        var contactUs = {
            name: req.body.name,
            status: req.body.status,
            waitingTime: req.body.waitingTime,
            rating: req.body.rating
        };
        return sequelize.transaction().then(function(t) {
            contactModel.ContactUs.sync({ force: false }).then(function() {
                return contactModel.ContactUs.create(contactUs, { transaction: t }).then(function(contactUs) {
                    res.send('Contact created: ' + JSON.stringify(contactUs));
                }).then(function() {
                    return t.commit();
                    //return t.rollback();
                }).catch(function(error) {
                    return t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(req, res) {
        return sequelize.transaction().then(function(t) {
            contactModel.ContactUs.findAll({ transaction: t }).then((contactUs) => {
                res.send('All Contacts: ' + JSON.stringify(contactUs));
            });
        });
    }

}

module.exports = ContactDao;