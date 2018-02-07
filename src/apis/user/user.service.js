import rtg from 'random-token-generator';
import nodemailer from 'nodemailer';
import Sequelize from 'sequelize';
var Promise = require('bluebird');

import log from '../../config/log4js.config';
import sequelize from '../../util/conn.mysql';
import userModel from './index';
import UserDao from './user.dao';
import GroupDao from '../group/group.dao';
import GroupUserMapDao from '../group/groupUserMap.dao';
import groupModel from '../group/index';
import groupUserMapModel from '../group/index';
import MessageService from '../message/message.service';

var userDao = new UserDao();
var groupDao = new GroupDao();
var groupUserMapDao = new GroupUserMapDao();
var messageService = new MessageService();

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
                pass: 'changedPassword'
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
        return userDao.insert(user, callback).then((userInserted) => {
            if (userInserted.privilege == 'user') {
                this.activationLink(userInserted.token);
                var group = {
                    name: 'MedHelp',
                    url: `/medhelp/${userInserted.id}`,
                    userId: userInserted.id,
                    description: 'Med help',
                    picture: 'https://d30y9cdsu7xlg0.cloudfront.net/png/363633-200.png',
                    createdBy: 'docbot',
                    updatedBy: 'docbot'
                };
                return groupDao.insert(group, () => {}).then((createdGroup) => {
                    var groupUserMap = {
                        userId: createdGroup.userId,
                        groupId: createdGroup.id,
                        createdBy: 'user',
                        updatedBy: 'user'
                    };
                    groupUserMapDao.insert(groupUserMap, () => {}).then((createdGroupUserMap) => {}).catch(err => err);
                    sequelize.query("select u.id, u.name, u.privilege, u.email, count(gu.userId) from user u LEFT JOIN group_user_map gu on u.id=gu.userId and u.privilege='BOT' group by u.id order by count(gu.userId) ASC", { type: sequelize.QueryTypes.SELECT })
                        .then((groupUserMaps) => {
                            var uId;
                            for (var i = 0; i < groupUserMaps.length; i++) {
                                if (groupUserMaps[i].privilege == 'user')
                                    continue;
                                else {
                                    uId = groupUserMaps[i].id;
                                    break;
                                }
                            }
                            var groupUserMapBot = {
                                groupId: createdGroup.id,
                                userId: uId,
                                createdBy: 'bot',
                                updatedBy: 'bot'
                            }
                            groupUserMapDao.insert(groupUserMapBot, () => {}).then((createdGroupUserMap) => {
                                log.info('bot mapped: ' + JSON.stringify(createdGroupUserMap));
                            });
                            var msg = {
                                receiverId: group.id,
                                receiverType: 'group', // group or individual
                                senderId: uId,
                                text: 'Welcome to Mesomeds!! How can we help you?'
                            }
                            messageService.sendMessage(msg, (result) => {});
                        });
                });
            } else {
                return; //in case of bot
            }
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
        return userDao.update(user, callback);
    }

    getAll(callback) {
        return userDao.readAll(callback);
    }

    getById(id, callback) {
        return userDao.readById(id, callback);
    }

    deleteRegisteredUser(id, callback) {
        return userDao.delete(id, callback);
    }

    /**
     * Find user by name for the login component
     */
    findUserByName(username, callback) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                userModel.User.findOne({
                    where: {
                        name: username
                    }
                }, { transaction: t }).then((user) => {
                    resolve(user);
                    callback(user);
                });
            }, reject);
        });
    }

    /**
     * get all bots 
     */
    getAllBots(offset) {
        return new Promise((resolve, reject) => {
            return sequelize.transaction().then(function(t) {
                userModel.User.findAll({
                    offset: offset,
                    where: {
                        name: Sequelize.literal(' name REGEXP "BOT*" ')
                    }
                }, { transaction: t }).then((user) => {
                    resolve(user);
                });
            }, reject);
        });
    }
}

export default UserService;