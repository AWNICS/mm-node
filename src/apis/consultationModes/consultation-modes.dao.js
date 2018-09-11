import consultationModesModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for ConsultationModes api
*/
class ConsultationModesDao {
    constructor() {}

    /**
     * insert method
     */
    insert(consultationMode, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                consultationModesModel.consultation_modes.create(consultationMode, { transaction: t }).then(function(consultationModeInserted) {
                    callback(consultationModeInserted);
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
        consultationModesModel.consultation_modes.findAll().then((consultationModes) => {
            callback(consultationModes);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        consultationModesModel.consultation_modes.find({ where: { id: id } }).then((consultationMode) => {
            callback(consultationMode);
        });
    }

    /**
     * Update method
     */
    update(consultationMode, callback) {
        sequelize.transaction().then(function(t) {
            consultationModesModel.consultation_modes.update(consultationMode, {
                where: {
                    id: consultationMode.id
                }
            }, { transaction: t }).then(function(consultationModeUpdated) {
                callback(consultationModeUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.error('Error in consultationMode dao update ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            consultationModesModel.consultation_modes.destroy({
                where: {
                    id: id
                }
            }).then(function(consultationModeDeleted) {
                callback(consultationModeDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default ConsultationModesDao;