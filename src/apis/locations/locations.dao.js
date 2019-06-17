import locationsModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Locations api
*/
class LocationsDao {
    constructor() {}

    /**
     * insert method
     */
    insert(locations, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                locationsModel.locations.create(locations, { transaction: t }).then(function(locationsInserted) {
                    callback(locationsInserted);
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
        locationsModel.locations.findAll({ order: [['name','ASC']]}).then((locations) => {
            callback(locations);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        locationsModel.locations.find({ where: { id: id } }).then((locations) => {
            callback(locations);
        });
    }

    /**
     * Update method
     */
    update(locations, callback) {
        sequelize.transaction().then(function(t) {
            locationsModel.locations.update(locations, {
                where: {
                    id: locations.id
                }
            }, { transaction: t }).then(function(locationsUpdated) {
                callback(locationsUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.error('Error in locations dao update ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            locationsModel.locations.destroy({
                where: {
                    id: id
                }
            }).then(function(locationsDeleted) {
                callback(locationsDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default LocationsDao;