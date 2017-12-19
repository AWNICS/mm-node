import log from '../../config/log4js.config';
import sequelize from '../../util/conn.mysql';
import userModel from './index';
import UserDao from './user.dao';
var rtg = require('random-token-generator');
var nodemailer = require('nodemailer');
var URLSearchParams = require('url-search-params');

var userDao = new UserDao();

/**
 * UserService 
 */
class UserService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'test.arung@gmail.com',
                pass: 'passwordtest'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    register(user, callback) {
        //generate random key
        rtg.generateKey({
            len: 16,
            string: true,
            strong: false,
            retry: false
        }, function(err, key) {
            if (err) {
                log.info(err);
            } else {
                user.token = key; //assign generated key to user
            }
        });
        userDao.insert(user, callback).then((userInserted) => {
            this.activationLink(userInserted.token);
        });
    }

    /**
     * activation link method
     */
    activationLink(token) {
        this.transporter.sendMail(this.emailFormat(token), function(error, info) {
            if (error) {
                console.log('error occured: ' + error);
            }
            console.log('Message sent');
        });
    }

    /**
     * email format
     */
    emailFormat(token) {
        var userMailOptions;
        const userOutput = `
            <h3>Greetings from Awnics!</h3>
            <p>Thank you for registering. Please click on the below link for activation.</p>
            <a href="http://localhost:3000/user/controllers/updateActivate/${token}" target="_blank">
                Click here to confirm
            </a>
            <p>Thanks and Regards,<br/>Awnics</p>
            `;

        // setup email data for user
        return userMailOptions = {
            from: 'test.arung@gmail.com',
            to: 'nilu.kumari@awnics.com',
            subject: 'Email activation link',
            text: "hello",
            html: userOutput
        };
    }

    /**
     * change activate column and match token
     */
    activateUser(token, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                userModel.User.find({ where: { token: token } }, { transaction: t }).then((resultFind) => {
                    if (resultFind.token === token) {
                        userModel.User.update({ "activate": 1, "privilege": "user" }, { where: { token: resultFind.token } });
                        log.info('result: ' + JSON.stringify(resultFind));
                        resolve(resultFind);
                        callback(resultFind);
                    } else {
                        log.error('error');
                    }
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            }, reject);
        });
    }

    updateRegisteredUser(user, callback) {
        userDao.update(user, callback);
    }

    getAll(callback) {
        userDao.readAll(callback);
    }

    getById(id, callback) {
        userDao.readById(id, callback);
    }

    deleteRegisteredUser(id, callback) {
        userDao.delete(id, callback);
    }

}

export default UserService;