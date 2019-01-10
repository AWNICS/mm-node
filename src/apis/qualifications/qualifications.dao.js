import qualificationsModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Qualifications api
*/
class QualificationsDao {
    constructor() {}

    /**
     * insert method
     */
    insert(qualification, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                qualificationsModel.qualifications.create(qualification, { transaction: t }).then(function(qualificationInserted) {
                    callback(qualificationInserted);
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
        qualificationsModel.qualifications.findAll().then((qualifications) => {
            callback(qualifications);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        qualificationsModel.qualifications.find({ where: { id: id } }).then((qualification) => {
            callback(qualification);
        });
    }

    /**
     * Update method
     */
    update(qualification, callback) {
        sequelize.transaction().then(function(t) {
            qualificationsModel.qualifications.update(qualification, {
                where: {
                    id: qualification.id
                }
            }, { transaction: t }).then(function(qualificationUpdated) {
                callback(qualificationUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.error('Error in qualification dao update ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            qualificationsModel.qualifications.destroy({
                where: {
                    id: id
                }
            }).then(function(qualificationDeleted) {
                callback(qualificationDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default QualificationsDao;