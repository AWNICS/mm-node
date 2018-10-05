import billingModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Billing api
*/
class BillingDao {
    constructor() {}

    /**
     * insert method
     */
    insert(billing, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                billingModel.billing.create(billing, { transaction: t }).then(function(billingInserted) {
                    callback(billingInserted);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        billingModel.billing.findAll().then((billings) => {
            callback(billings);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        billingModel.billing.find({ where: { id: id } }).then((billing) => {
            callback(billing);
        });
    }

    /**
     * Update method
     */
    update(billing, callback) {
        sequelize.transaction().then(function(t) {
            billingModel.billing.update(billing, {
                where: {
                    id: billing.id
                }
            }, { transaction: t }).then(function(billingUpdated) {
                callback(billingUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.error('Error in billing dao update ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            billingModel.billing.destroy({
                where: {
                    id: id
                }
            }).then(function(billingDeleted) {
                callback(billingDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default BillingDao;