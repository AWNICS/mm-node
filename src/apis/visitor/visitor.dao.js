import visitorModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for patient-info api
 */
class VisitorDao {

    /**
     * insert method
     */
    insert(visitor, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                visitorModel.visitor.create(visitor, { transaction: t }).then(function(insertedVisitor) {
                    callback(insertedVisitor);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    log.error('error in visitorDao ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        visitorModel.visitor.findAll().then((visitor) => {
            callback(visitor);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        visitorModel.visitor.find({ where: { userId: id } }).then((visitor) => {
            callback(visitor);
        });
    }

    /**
     * Update method
     */
    update(visitor, callback) {
        sequelize.transaction().then(function(t) {
            visitorModel.visitor.update(visitor, {
                where: {
                    userId: visitor.userId
                }
            }, { transaction: t }).then(function(visitorUpdated) {
                callback(visitorUpdated);
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
            visitorModel.visitor.destroy({
                where: {
                    id: id
                }
            }).then(function(visitor) {
                callback(visitor);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = VisitorDao;