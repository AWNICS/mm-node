import NotificationDao from './notification.dao';
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

    update(notification, id, callback) {
        notificationDao.update(notification, id, callback);
    }

    remove(id, callback) {
        notificationDao.delete(id, callback);
    }
}

export default NotificationService;