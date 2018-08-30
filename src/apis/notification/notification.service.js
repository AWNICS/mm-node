import NotificationDao from './notification.dao';
import log from '../../config/log4js.config';
import notificationModel from './index';

const notificationDao = new NotificationDao();
const Op = require('sequelize').Op;

class NotificationService {

    create(notification, callback) {
        notificationDao.insert(notification, callback);
    }

    readByTime(callback) {
        var currentTime = new Date();
        var lowerLimit = currentTime.setSeconds(0);
        var upperLimit = currentTime.setSeconds(59);
        notificationModel.notification.findAll({
                where: {
                    triggerTime: {
                        [Op.gt]: lowerLimit,
                        [Op.lt]: upperLimit
                    }
                }
            })
            .then(notifications => {
                callback(notifications);
            });
    }

    readAll(callback) {
        notificationDao.readAll(callback);
    }

    readById(id, callback) {
        notificationDao.readById(id, callback);
    }

    update(notification, callback) {
        notificationDao.update(notification, (res) => {
            callback(res);
        });
    }

    remove(id, callback) {
        notificationDao.delete(id, callback);
    }

    readWebNotificationsByUserId(userId, page, size, callback) {
        var offset = ((size * page) - size);
        notificationModel.notification.findAll({
            where: {
                userId: userId,
                channel: 'web'
            },
            offset: offset,
            limit: size
        }).then((notifications) => {
            callback(notifications);
        }).catch((err) => {
            log.error('Error while fetching notifications by userId ', err);
            callback({
                message: 'Error while fetching notifications'
            });
        });
    }
}

export default NotificationService;