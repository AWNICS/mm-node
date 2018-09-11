import allergiesModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Allergies api
*/
class AllergiesDao {
    constructor() {}

    /**
     * insert method
     */
    insert(allergy, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                allergiesModel.allergies.create(allergy, { transaction: t }).then(function(allergiesInserted) {
                    callback(allergiesInserted);
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
        allergiesModel.allergies.findAll().then((allergies) => {
            callback(allergies);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        allergiesModel.allergies.find({ where: { id: id } }).then((allergy) => {
            callback(allergy);
        });
    }

    /**
     * Update method
     */
    update(allergy, callback) {
        sequelize.transaction().then(function(t) {
            allergiesModel.allergies.update(allergy, {
                where: {
                    id: allergy.id
                }
            }, { transaction: t }).then(function(allergyUpdated) {
                callback(allergyUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.error('Error in allergy dao update ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            allergiesModel.allergies.destroy({
                where: {
                    id: id
                }
            }).then(function(allergyDeleted) {
                callback(allergyDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default AllergiesDao;