import specialitiesModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Specialities api
*/
class SpecialitiesDao {
    constructor() {}

    /**
     * insert method
     */
    insert(specialities, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                specialitiesModel.specialities.create(specialities, { transaction: t }).then(function(specialitiesInserted) {
                    callback(specialitiesInserted);
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
        specialitiesModel.specialities.findAll({order: [['name','ASC']]}).then((specialities) => {
            callback(specialities);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        specialitiesModel.specialities.find({ where: { id: id } }).then((specialities) => {
            callback(specialities);
        });
    }

    /**
     * Update method
     */
    update(specialities, callback) {
        sequelize.transaction().then(function(t) {
            specialitiesModel.specialities.update(specialities, {
                where: {
                    id: specialities.id
                }
            }, { transaction: t }).then(function(specialitiesUpdated) {
                callback(specialitiesUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.error('Error in specialities dao update ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            specialitiesModel.specialities.destroy({
                where: {
                    id: id
                }
            }).then(function(specialitiesDeleted) {
                callback(specialitiesDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default SpecialitiesDao;