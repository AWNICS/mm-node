import notificationModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Notification api
*/
class NotificationDao {
    constructor() {}

    /**
     * insert method
     */
    insert(notification, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                notificationModel.notification.create(notification, { transaction: t }).then(function(notificationInserted) {
                    callback(notificationInserted);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    log.error('Error while creating a new notification: ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        notificationModel.notification.findAll().then((allNotification) => {
            callback(allNotification);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        notificationModel.notification.find({ where: { id: id } }).then((notification) => {
            callback(notification);
        });
    }

    /**
     * Update method
     */
    update(notification, callback) {
        sequelize.transaction().then(function(t) {
            notificationModel.notification.update(notification, {
                where: {
                    id: notification.id
                }
            }, { transaction: t }).then(function(notificationUpdated) {
                callback(notificationUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.info('Error while updating the user: ' + error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            notificationModel.notification.destroy({
                where: {
                    id: id
                }
            }).then(function(notificationDeleted) {
                callback({ message: "Notification deleted." });
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default NotificationDao;