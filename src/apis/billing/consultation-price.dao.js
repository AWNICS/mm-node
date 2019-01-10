import consultationPriceModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Consultation price api
*/
class ConsultationPriceDao {
    constructor() {}

    /**
     * insert method
     */
    insert(consultationPrice, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                consultationPriceModel.consultation_price.create(consultationPrice, { transaction: t })
                    .then(function(consultationPriceInserted) {
                        callback(consultationPriceInserted);
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
        consultationPriceModel.consultation_price.findAll().then((consultationPrices) => {
            callback(consultationPrices);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        consultationPriceModel.consultation_price.find({ where: { id: id } }).then((consultationPrice) => {
            callback(consultationPrice);
        });
    }

    /**
     * Update method
     */
    update(consultationPrice, callback) {
        sequelize.transaction().then(function(t) {
            consultationPriceModel.consultation_price.update(consultationPrice, {
                where: {
                    id: consultationPrice.id
                }
            }, { transaction: t }).then(function(consultationPriceUpdated) {
                callback(consultationPriceUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.error('Error in consultationPrice dao update ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            consultationPriceModel.consultation_price.destroy({
                where: {
                    id: id
                }
            }).then(function(consultationPriceDeleted) {
                callback(consultationPriceDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default ConsultationPriceDao;