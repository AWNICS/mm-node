import https from 'https';
import Dotenv from 'dotenv';

import NotificationDao from './notification.dao';
import log from '../../config/log4js.config';
import notificationModel from './index';
const moment = require('moment');

const notificationDao = new NotificationDao();
const Op = require('sequelize').Op;
const dotenv = Dotenv.config({
    path: '.env.dev'
});

class NotificationService {

    create(notification, callback) {
        notificationDao.insert(notification, callback);
    }

    readByTime(callback) {
        var currentTime = Date.now();
        var lowerLimit = currentTime - 5 * 60 * 1000;
        var upperLimit = currentTime;
        notificationModel.notification.findAll({
                where: {
                    triggerTime: {
                        [Op.gt]: lowerLimit,
                        [Op.lt]: upperLimit
                    },
                    channel: 'web',
                    status: 'created'
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
                channel: 'web',
                status: {
                    [Op.or]: ['sent','created']
                }
            },
            order: [
                ['createdAt', 'DESC']
            ],
            offset: offset,
            limit: size
        }).then((notifications) => {
            callback(notifications);
            let count = 0;
            notifications.map((notification) => {
                if(notification.status === 'created'){
                    count++;
                }
            })
            //this step to save db operation when db is in cloud
            if(count > 0){
                notificationModel.notification.update({status: 'sent'}, { where: {
                    userId: userId,
                    channel: 'web',
                    status: {
                        [Op.or]: ['created']
                    }
                },
                sideEffects: false,
                limit: size,
                offset: offset
            }).then((done) => {
                log.info(`Updated user with id ${userId} notification status to sent`);
            }).catch(err => {
                log.error(`Error while updating user with  id ${userId} notifications to read `+err);
            })
            }
        }).catch((err) => {
            log.error('Error while fetching notifications by userId ', err);
            callback({
                message: 'Error while fetching notifications'
            });
        });
    }
    clearAllNotifications(userId, callback) {
        notificationModel.notification.update({status: 'read'}, {where: {
            status: {
                [Op.or]: ['sent','created']
            },
            userId: userId
        }, sideEffects: false}).then((success) => {
        log.info('Successfully cleared notifications for user with id ' + userId);
        callback({'status':'success','message':'Update Success'})
    }).catch((err) => {
        log.error('Failed to cleare notifications for user with id ' + userId + ' '+ err);
        callback({'status':'failed','message':'Error while updating'})
    })
    }
    sendOtp(message, mobileNo, callback) {
        var options = {
            "method": "POST",
            "hostname": "control.msg91.com",
            "port": null,
            "path": `/api/sendotp.php?otp_length=${process.env.OTP_LENGTH}&authkey=${process.env.MES91_KEY}&message=${message}&sender=${process.env.MES91_SENDER}&mobile=${mobileNo}&otp_expiry=${process.env.OTP_EXPIRY}`,
            "headers": {}
        };
        var req = https.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var body = Buffer.concat(chunks);
                log.info('OTP sent to ' + mobileNo + ' res: ' + body.toString());
                callback(JSON.parse(body));
            });
        });

        req.end();
    }

    resendOtp(mobileNo, callback) {
        var options = {
            "method": "POST",
            "hostname": "control.msg91.com",
            "port": null,
            "path": `/api/retryotp.php?authkey=${process.env.MES91_KEY}&mobile=${mobileNo}&retrytype=${process.env.OTP_RETRY_TYPE}`,
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        var req = https.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var body = Buffer.concat(chunks);
                log.info('OTP resent to ' + mobileNo + ' res: ' + body.toString());
                callback(JSON.parse(body));
            });
        });

        req.end();
    }

    verfiyOtp(mobileNo, otp, callback) {
        var options = {
            "method": "POST",
            "hostname": "control.msg91.com",
            "port": null,
            "path": `/api/verifyRequestOTP.php?authkey=${process.env.MES91_KEY}&mobile=${mobileNo}&otp=${otp}`,
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        var req = https.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var body = Buffer.concat(chunks);
                log.info('OTP verified for ' + mobileNo + ' res: ' + body.toString());
                callback(JSON.parse(body));
            });
        });

        req.end();
    }
}

export default NotificationService;