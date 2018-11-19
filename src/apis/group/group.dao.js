import consultationGroupModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Doctor api
*/
class GroupDao {
    constructor() {}

    /**
     * insert method
     */
    insert(group, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                consultationGroupModel.consultation_group.create(group, { transaction: t }).then(function(groupInserted) {
                    callback(groupInserted);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    log.error('Error while creating a new group: ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        consultationGroupModel.consultation_group.findAll().then((allGroup) => {
            callback(allGroup);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        consultationGroupModel.consultation_group.find({ where: { id: id } }).then((group) => {
            callback(group);
        });
    }

    /**
     * Update method
     */
    update(group, callback) {
        sequelize.transaction().then(function(t) {
            consultationGroupModel.consultation_group.update(group, {
                where: {
                    id: group.id
                }
            }, { transaction: t }).then(function(groupUpdated) {
                callback(groupUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.info(error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            consultationGroupModel.consultation_group.destroy({
                where: {
                    id: id
                }
            }).then(function(groupDeleted) {
                callback(groupDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default GroupDao;