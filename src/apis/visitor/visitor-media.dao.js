import visitorMediaModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for visitor-media api
 */
class VisitorMediaDao {

    /**
     * insert method
     */
    insert(visitorMedia, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                visitorMediaModel.visitor_media.create(visitorMedia, { transaction: t }).then(function(insertedVisitorMedia) {
                    callback(insertedVisitorMedia);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    log.error('error in visitorMediaDao ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        visitorMediaModel.visitor_media.findAll().then((visitorMedias) => {
            callback(visitorMedias);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        visitorMediaModel.visitor_media.find({ where: { visitorId: id } }).then((visitorMedia) => {
            callback(visitorMedia);
        });
    }

    /**
     * Update method
     */
    update(visitorMedia, callback) {
        sequelize.transaction().then(function(t) {
            visitorMediaModel.visitor_media.update(visitorMedia, {
                where: {
                    visitorId: visitorMedia.visitorId
                }
            }, { transaction: t }).then(function(visitorMediaUpdated) {
                callback(visitorMediaUpdated);
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
            visitorMediaModel.visitor_media.destroy({
                where: {
                    id: id
                }
            }).then(function(visitorMedia) {
                callback(visitorMedia);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = VisitorMediaDao;