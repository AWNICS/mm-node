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
        var currentTime = new Date();
        var lowerLimit = currentTime.setSeconds(0);
        var upperLimit = currentTime.setSeconds(40);
        // console.log('lowerlimit'+lowerLimit);
        // console.log(moment().add(45, 's'));
        // console.log('upperlimit'+upperLimit);
        notificationModel.notification.findAll({
                where: {
                    triggerTime: {
                        [Op.gt]: lowerLimit,
                        [Op.lt]: upperLimit
                    },
                    channel: 'web',
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
                    [Op.eq]: 'sent'
                }
            },
            order: [
                ['createdAt', 'DESC']
            ],
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