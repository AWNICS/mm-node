import staffInfoModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for staff-info api
 */
class PatientInfoDao {
    constructor() {}

    /**
     * insert method
     */
    insert(staffInfo, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                staffInfoModel.staff_info.create(staffInfo, { transaction: t }).then(function(insertedStaffInfo) {
                    callback(insertedStaffInfo);
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
        staffInfoModel.staff_info.findAll().then((staffInfo) => {
            callback(staffInfo);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        staffInfoModel.staff_info.findById(id).then((staffInfo) => {
            callback(staffInfo);
        });
    }

    /**
     * Update method
     */
    update(staffInfo, callback) {
        sequelize.transaction().then(function(t) {
            staffInfoModel.staff_info.update(staffInfo, {
                where: {
                    id: staffInfo.id
                }
            }, { transaction: t }).then(function(staffInfoUpdated) {
                callback(staffInfoUpdated);
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
            staffInfoModel.staff_info.destroy({
                where: {
                    id: id
                }
            }).then(function(staffInfo) {
                callback(staffInfo);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = StaffInfoDao;