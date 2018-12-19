import Dotenv from 'dotenv';
import MessageService from '../message/message.service';
import GroupService from '../group/group.service';
import log from '../../config/log4js.config';
import UserService from '../user/user.service';
import consultationGroupModel from '../group/index';
import DialogFlowService from '../dialogFlow/dialogFlow.service';
const jwt = require('jsonwebtoken');
import AuditService from '../audit/audit.service';
import AuditModel from '../audit/audit.model';
import NotificationService from '../notification/notification.service';
import visitorModel from '../visitor/index';
import notificationModel from '../notification/index';
import sequelize from '../../util/conn.mysql';
import VisitorService from '../visitor/visitor.service';
import BillingDao from '../billing/billing.dao';
import billingModel from '../billing/index';
import GroupDao from '../group/group.dao';
import DoctorServce from '../doctor/doctor.service';
import VisitorPrescriptionDao from '../visitor/visitor-prescription.dao';
import groupUserMapModel from '../group/index';

const moment = require('moment');
const Op = require('sequelize').Op;
const messageService = new MessageService();
const groupService = new GroupService();
const userService = new UserService();
const dialogFlowService = new DialogFlowService();
const auditService = new AuditService();
const notificationService = new NotificationService();
const billingDao = new BillingDao();
const groupDao = new GroupDao();
const doctorService = new DoctorServce();
const visitorService = new VisitorService();
const visitorPrescriptionDao = new VisitorPrescriptionDao();

exports.connectSocket = (io) => {
    io.use(function(socket, next) {
            if (socket.handshake.query && socket.handshake.query.token) {
                jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function(err, decoded) {
                    if (err) return next(new Error('Authentication error'));
                    socket.decoded = decoded;
                    next();
                });
            } else {
                next(new Error('Authentication error'));
            }
        })
        .on('connection', function(socket) {
            socket.on('disconnect', (type) => {
                console.log('disc');
                console.log(type);
                let userId = socket.decoded.data.id;
                userService.getById(userId, (user) => {
                    let socketId = [];
                    if (user.socketId !== null) {
                        socketId = user.socketId;
                    }
                    socketId.splice(socketId.indexOf(socket.id), 1);
                    userService.updateRegisteredUser({
                        'id': userId,
                        'socketId': socketId,
                        'status': 'offline'
                    }, () => {});
                });
                if (type === 'transport close') {
                    log.info('User disconnected with ID: ' + userId);
                    //         consultationGroupModel.consultation_group.findAll({where:{userId:userId,name:'MedHelp'}}).then((result)=>{
                    //             if(result){
                    //         groupService.getAllGroupMapsByUserId(userId, (gumaps) => {
                    //             if(result.id !== gumap.groupId){
                    //             gumaps.map((gumap) => {
                    //                 groupService.getAllUsersInGroup(gumap.groupId).then((allUsers) => {
                    //                     let count = 0;
                    //                     allUsers.map((user) => {
                    //                         if (user.role !== 'bot' && user.status === 'online') {
                    //                             count++;
                    //                         }
                    //                     })
                    //                     if (count < 2) {
                    //                         log.info('Group Status Update with ID: ' + gumap.groupId + ' offline');
                    //                         allUsers.map((user) => {
                    //                             if (user.role !== 'bot' && user.id !== userId) {
                    //                                 io.in(user.socketId).emit('received-group-status', { 'groupId': gumap.groupId, 'groupStatus': 'offline' });
                    //                             }
                    //                         })
                    //                         groupService.updateGroupStatus(gumap.groupId, 'offline', (result) => {
                    //                             result === 1 ? log.info("Group status updated in DB for ID: " + gumap.groupId + ' to offline') : null;
                    //                         })
                    //                     }
                    //                 })
                    //             })
                    //         }
                    //         })
                    //     }
                    // })
                }
            })

            // get userId from client
            socket.on('user-connected', userId => {
                log.info('a user connected with ID: ' + userId);
                userService.getById(userId, (user) => {
                    if (user.id === userId) {
                        let socketId = [];
                        if (user.socketId !== null) {
                            socketId = user.socketId;
                        }
                        socketId.push(socket.id);
                        userService.updateRegisteredUser({
                            'id': userId,
                            'socketId': socketId,
                            'status': 'online'
                        }, (user) => {});

                        // consultationGroupModel.consultation_group.findAll({where:{userId:userId,name:'MedHelp'}}).then((result)=>{
                        //     if(result){
                        //         groupService.getAllGroupMapsByUserId(userId, (gumaps) => {
                        //             gumaps.map((gumap) => {
                        //                 if(result.id !== gumap.groupId){
                        //                 groupService.getAllUsersInGroup(gumap.groupId).then((allUsers) => {
                        //                     let count = 0;
                        //                     allUsers.map((user) => {
                        //                         if (user.role !== 'bot' && user.status === 'online') {
                        //                             count++;
                        //                         }
                        //                     })
                        //                     if (count > 1) {
                        //                         log.info('Group status Update with ID: ' + gumap.groupId + ' online');
                        //                         allUsers.map((user) => {
                        //                             if (user.role !== 'bot') {
                        //                                 io.in(user.socketId).emit('received-group-status', { 'groupId': gumap.groupId, 'groupStatus': 'online' });
                        //                             }
                        //                         })
                        //                         groupService.updateGroupStatus(gumap.groupId, 'online', (result) => {
                        //                             result === 1 ? log.info("Group status updated in DB for ID: " + gumap.groupId + ' to online') : null;
                        //                         })
                        //                     }
                        //                 })
                        //             }
                        //             })
                        //         })      
                        //     }
                        // })
                    }
                });
                var audit = new AuditModel({
                    senderId: userId,
                    receiverId: '',
                    receiverType: '',
                    mode: 'bot',
                    entityName: 'visitor',
                    entityEvent: 'login',
                    createdBy: userId,
                    updatedBy: userId,
                    createdTime: Date.now(),
                    updatedTime: Date.now()
                });
                auditService.create(audit, (auditCreated) => {});
            });

            socket.on('message-read', (groupId, userId) => {
                userService.getById(userId, (user) => {
                    let socketIds = [];
                    socketIds = user.socketId;
                    if (socketIds !== null) {
                        socketIds.map((socketId) => {
                            io.in(socketId).emit('receive-message-read', groupId);
                        });
                    }
                });
                groupUserMapModel.consultation_group_user_map.update({ unreadCount: 0 }, {
                    where: {
                        groupId: groupId,
                        userId: userId
                    }
                }).then((a) => {
                    console.log('message read');
                    console.log(a);
                });
            });

            socket.on('count-sync', (userId, count) => {
                userService.getById(userId, (user) => {
                    let socketIds = [];
                    socketIds = user.socketId;
                    if (socketIds !== null) {
                        socketIds.map((socketId) => {
                            io.in(socketId).emit('receive-count-sync', count);
                            console.log('Emiited across sockets the sync count');
                        });
                    }
                });
            });

            /**
             * for sending message to group/user which is emitted from client(msg with an groupId/userId)
             */
            socket.on('send-message', (msg, group) => {
                // if it is a group message
                if (msg.receiverType === "group") {
                    messageService.sendMessage(msg, (result) => {
                        groupService.getUsersByGroupId(msg.receiverId, (user) => {
                            if (user.role !== 'bot') {
                                let socketIds = [];
                                socketIds = user.socketId;
                                if (socketIds !== null) {
                                    socketIds.map((socketId) => {
                                        io.in(socketId).emit('receive-message', result); //emit one-by-one for all users
                                    });
                                }
                            }
                            if (user.role !== 'bot' && msg.senderId !== user.id) {
                                groupUserMapModel.consultation_group_user_map.increment('unreadCount', {
                                    where: {
                                        groupId: msg.receiverId,
                                        userId: user.id
                                    }
                                }).then((a) => {
                                    console.log('message sent');
                                    console.log(a);
                                })
                            }
                        });
                    });
                    groupService.getById(group.id, (group) => {
                        if (group.phase === 'inactive' && msg.type !== 'notification') {
                            consultationGroupModel.consultation_group_user_map.findAll({
                                where: {
                                    groupId: group.id
                                }
                            }).then((groupUserMaps) => {
                                groupUserMaps.map((groupUserMap) => {
                                    userService.getById(groupUserMap.userId, (user) => {
                                        if (user.role === 'bot') {
                                            dialogFlowService.callDialogFlowApi(msg.text, res => {
                                                res.map(result => {
                                                    msg.text = result.text.text[0];
                                                    msg.senderId = user.id;
                                                    msg.updatedBy = user.id;
                                                    msg.createdBy = user.id;
                                                    msg.senderName = user.firstname + ' ' + user.lastname;
                                                    messageService.sendMessage(msg, (result) => {
                                                        groupService.getUsersByGroupId(msg.receiverId, (user) => {
                                                            let socketIds = [];
                                                            socketIds = user.socketId;
                                                            if (socketIds !== null) {
                                                                socketIds.map((socketId) => {
                                                                    io.in(socketId).emit('receive-message', result);
                                                                    //emit one-by-one for all users
                                                                });
                                                            }
                                                        });
                                                    });
                                                });
                                            });
                                        }
                                    });
                                });
                            });
                        } else {
                            return;
                        }
                    });
                }
                // if it is a private message 
                else if (msg.receiverType === "private") {
                    userService.getById(msg.senderId, (result) => {
                        msg.createdBy = `${result.firstname} ${result.lastname}`;
                        msg.updatedBy = `${result.firstname} ${result.lastname}`;
                        msg.picUrl = result.picUrl;
                        messageService.sendMessage(msg, (result) => {
                            userService.getById(msg.receiverId, (user) => {
                                let socketIds = [];
                                socketIds = user.socketId;
                                if (socketIds !== null) {
                                    socketIds.map((socketId) => {
                                        socket.to(socketId).emit('receive-message', result);
                                    });
                                }
                            });
                        });
                    });
                }
                // if neither group nor user is selected
                else {
                    userService.getById(msg.senderId, (result) => {
                        let socketIds = [];
                        socketIds = result.socketId;
                        if (socketIds !== null) {
                            socketIds.map((socketId) => {
                                socket.to(socketId).emit('receive-message', {
                                    "text": 'Select a group or an user to chat with.'
                                }); //only to sender
                            });
                        }
                    });
                }

                //for media files emit event
                if (msg.type === 'image' || msg.type === 'video' || msg.type === 'doc') {
                    messageService.media(msg.receiverId, 1, 5, (media) => {
                        userService.getById(msg.senderId, (user) => {
                            let socketIds = [];
                            socketIds = user.socketId;
                            if (socketIds !== null) {
                                socketIds.map((socketId) => {
                                    io.in(socketId).emit('media-file', media);
                                });
                            }
                        });
                    });
                }
            });

            socket.on('send-typing', (groupId, userName, prescription) => {
                groupService.getAllUsersByGroupId(groupId, (users) => {
                    users.map(user => {
                        let socketIds = [];
                        socketIds = user.socketId;
                        if (socketIds !== null) {
                            socketIds.map((socketId) => {
                                user.firstname + ' ' + user.lastname === userName ? null : socket.to(socketId)
                                    .emit('receive-typing', { 'groupId': groupId, 'userName': userName, 'prescription': prescription }); //emit one-by-one for all users
                            });
                        }
                    });
                });
            });

            /**
             * for updating the message in mongo
             */
            socket.on('update-message', (data) => {
                messageService.update(data.message, (res) => {
                    groupService.getUsersByGroupId(data.message.receiverId, (user) => {
                        let socketIds = [];
                        socketIds = user.socketId;
                        if (socketIds !== null) {
                            socketIds.map((socketId) => {
                                io.in(socketId).emit('updated-message', {
                                    message: res,
                                    index: data.index // added message index to update the same on UI
                                }); //emit one-by-one for all users
                            });
                        }
                    });
                });
            });

            socket.on('doctor-status', (userId, status) => {
                userService.getById(userId, (user) => {
                    let socketIds = [];
                    if (user.socketId !== null) {
                        socketIds = user.socketId;
                    }
                    doctorService.updateDoctorSchedule({ status: status }, userId, (statusUpdated) => {
                        userService.updateRegisteredUser({
                            'id': userId,
                            'socketId': socketIds,
                            'status': status
                        }, () => {});
                        // userService.getById(userId, (user) => {
                            // let socketIds = [];
                            // socketIds = user.socketId;
                            if (socketIds !== null) {
                                socketIds.map((socketId) => {
                                    io.in(socketId).emit('received-doctor-status', status);
                                });
                            }
                        // });
                    });
                });
                // groupService.getAllGroupMapsByUserId(userId, (gumaps) => {
                //     gumaps.map((gumap) => {
                //         groupService.getAllUsersInGroup(gumap.groupId).then((allUsers) => {
                //             let count = 0;
                //             allUsers.map((user) => {
                //                 if (user.role !== 'bot' && user.status === 'online') {
                //                     count++;
                //                 }
                //             });
                //             if (count > 1) {
                //                 log.info('Group status Update with ID: ' + gumap.groupId + ' online');
                //                 allUsers.map((user) => {
                //                     if (user.role !== 'bot') {
                //                         let socketIds = [];
                //                         socketIds = user.socketId;
                //                         if (socketIds !== null) {
                //                             socketIds.map((socketId) => {
                //                                 io.in(socketId).emit('received-group-status', { 'groupId': gumap.groupId, 'groupStatus': 'online' });
                //                             });
                //                         }
                //                     }
                //                 });
                //                 groupService.updateGroupStatus(gumap.groupId, 'online', (result) => {
                //                     result === 1 ? log.info("Group status updated in DB for ID: " + gumap.groupId + ' to online') : null;
                //                 });
                //             } else {
                //                 log.info('Group status Update with ID: ' + gumap.groupId + ' offline');
                //                 allUsers.map((user) => {
                //                     if (user.role !== 'bot') {
                //                         let socketIds = [];
                //                         socketIds = user.socketId;
                //                         if (socketIds !== null) {
                //                             socketIds.map((socketId) => {
                //                                 io.in(socketId).emit('received-group-status', { 'groupId': gumap.groupId, 'groupStatus': 'offline' });
                //                             });
                //                         }

                //                     }
                //                 })
                //                 groupService.updateGroupStatus(gumap.groupId, 'offline', (result) => {
                //                     result === 1 ? log.info("Group status updated in DB for ID: " + gumap.groupId + ' to offline') : null;
                //                 })

                //             }
                //         })
                //     })
                // })

            });

            /**
             * delete message
             */
            socket.on('delete-message', (data, index) => {
                messageService.removeGroupMessageMap(data._id, (result) => {
                    groupService.getUsersByGroupId(data.receiverId, (user) => {
                        let socketIds = [];
                        socketIds = user.socketId;
                        if (socketIds !== null) {
                            socketIds.map((socketId) => {
                                io.in(socketId).emit('deleted-message', {
                                    result,
                                    data,
                                    index
                                }); //emit one-by-one for all users
                            });
                        }
                    });
                });
            });

            /**
             * notifying online users for deleted message
             */
            socket.on('notify-users', (data) => {
                groupService.getUsersByGroupId(data.receiverId, (user) => {
                    let socketIds = [];
                    socketIds = user.socketId;
                    if (socketIds !== null) {
                        socketIds.map((socketId) => {
                            io.in(socketId).emit('receive-notification', {
                                'message': 'One message deleted from this group'
                            }); //emit one-by-one for all users
                        });
                    }
                });
            });
            //when user clicks consult now on doctor's list  page
            socket.on('consult-now', (user, doctorId, doctorName, speciality) => {
                //this is to create billing entry for the user
                if (user.role === 'patient') {
                    let date = Date.now().toString();
                    let date1 = date.slice(date.length - 4, date.length);
                    let orderId = (date1 + (1 * 369)).replace('.', '1').slice(0, 6);
                    let bill = {
                        doctorId: doctorId,
                        visitorId: user.id,
                        speciality: speciality,
                        // consultationId: group.id,
                        orderId: orderId,
                        status: 'due',
                        amount: '1',
                        date: Date.now(),
                        description: `Consultation with Dr. ${doctorName}`
                    }
                    billingModel.billing.findAll({
                        where: {
                            doctorId: doctorId,
                            visitorId: user.id
                        }
                    }).then((result) => {
                        if (result.length === 0) {
                            billingDao.insert(bill, (result) => {
                                log.info('Created Billing entry for user: ' + user.firstname + ' ' + user.lastname);
                                io.in(socket.id).emit('receive-consult-now', ['billing', bill.orderId]);
                            });
                        } else {
                            let paymentSuccess;
                            let billingEntryExists;
                            result.map((res) => {
                                if (res.status === 'Success') {
                                    paymentSuccess = true;
                                }
                                if (res.status !== 'Success' || !res.consultationId) {
                                    billingEntryExists = true;
                                }
                            });
                            if (paymentSuccess) {
                                consultationGroupModel.consultation_group.findAll({
                                    where: {
                                        userId: user.id,
                                        doctorId: doctorId,
                                        phase: ['active', 'botInactive']
                                    }
                                }).then((response) => {
                                    if (response.length > 0) {
                                        io.in(socket.id).emit('receive-consult-now', ['chat']);
                                        log.info(`An active group entry alread there for doctorName ${doctorName} and userName ${user.firstname}`);
                                    } else {
                                        if (!billingEntryExists) {
                                            billingDao.insert(bill, (result) => {
                                                log.info('Created Billing entry for user: ' + user.firstname + ' ' + user.lastname + ' because of group being inactive or archived');
                                                io.in(socket.id).emit('receive-consult-now', ['billing', bill.orderId]);
                                            });
                                        } else {
                                            log.info(`An pending billing entry alread there for doctorName ${doctorName} and userName ${user.firstname}`);
                                            io.in(socket.id).emit('receive-consult-now', ['billing', result.orderId]);
                                        }
                                    }
                                });
                            } else {
                                io.in(socket.id).emit('receive-consult-now', ['billing', result.orderId]);
                                log.info(`An pending billing entry alread there for doctorName ${doctorName} and userName ${user.firstname}`);
                            }
                        }
                    })
                }
            });

            /**
             * user or doctor added to consultation group
             */
            socket.on('user-added', (doctor, notification) => {
                groupService.getById(notification.content.consultationId, (group) => {
                    if (notification.status === 'created' || notification.status === 'sent') {
                        var newNotification = {
                            id: notification.id,
                            template: notification.template,
                            status: 'read',
                            content: notification.content
                        };
                        notificationService.update(newNotification, (updatedNotification) => {
                            log.info('updated notification status to read', updatedNotification);
                            var groupUserMap = {
                                groupId: group.id,
                                userId: doctor.id,
                                createdBy: doctor.id,
                                updatedBy: doctor.id
                            };
                            groupService.createGroupUserMap(groupUserMap, () => {
                                var newGroup = {
                                    id: group.id,
                                    phase: 'active',
                                    details: group.details
                                };
                                groupService.update(newGroup, () => {
                                    groupService.getUsersByGroupId(group.id, (user) => {
                                        log.info(user.firstname + ' Emitted receive-user-added event');
                                        let socketIds = [];
                                        socketIds = user.socketId;
                                        if (socketIds !== null) {
                                            socketIds.map((socketId) => {
                                                io.in(socketId).emit('receive-user-added', {
                                                    message: `Dr. ${doctor.firstname} ${doctor.lastname} joined the consultation`,
                                                    doctorId: doctor.id,
                                                    group: group,
                                                    socketId: socket.id
                                                }); //emit one-by-one for all users 
                                            });
                                        }
                                        if (user.role === 'patient') {
                                            //this will create appointment when multiple patients in a group
                                            billingModel.billing.find({
                                                where: {
                                                    consultationId: group.id
                                                }
                                            }).then((billing) => {
                                                userService.getById(user.id, (user) => {
                                                    var visitorAppointment = {
                                                        visitorId: user.id,
                                                        doctorId: doctor.id,
                                                        groupId: group.id,
                                                        consultationId: billing.consultationId,
                                                        status: 'Scheduled',
                                                        activity: `Consultation with ${user.firstname} ${user.lastname}`,
                                                        slotId: 5,
                                                        type: 'New Consultation',
                                                        waitTime: 5,
                                                        startTime: moment().add(5, 'm'),
                                                        endTime: moment().add(20, 'm'),
                                                        duration: 15,
                                                        createdBy: user.id,
                                                        updatedBy: user.id
                                                    };
                                                    doctorService.createConsultation(visitorAppointment, (visitorAppointmentCreated) => {
                                                        log.info('visitor apppointment created');
                                                        /**
                                                         * create consultation entry details inside the visitor-timeline table
                                                         */
                                                        doctorService.getById(doctor.id, (doctorDetails) => {
                                                            userService.getById(doctorDetails.doctorDetails.userId, (userDetails) => {
                                                                var visitorTimeline = {
                                                                    visitorId: user.id,
                                                                    timestamp: visitorAppointmentCreated.startTime,
                                                                    consultations: {
                                                                        "appointmentId": visitorAppointmentCreated.id,
                                                                        "doctorName": `Dr. ${userDetails.firstname} ${userDetails.lastname}`,
                                                                        "time": visitorAppointmentCreated.startTime,
                                                                        "speciality": doctorDetails.doctorDetails.speciality,
                                                                        "description": "Consultation for pre check-up info"
                                                                    },
                                                                    reminders: null,
                                                                    events: null,
                                                                    createdBy: user.id,
                                                                    updatedBy: user.id
                                                                };
                                                                visitorService.createVisitorTimeline(visitorTimeline, (timeline) => {
                                                                    log.info('timeline created');
                                                                });

                                                                //prescription enrty
                                                                var visitorPrescription = {
                                                                    doctorId: doctor.id,
                                                                    visitorId: user.id,
                                                                    consultationId: billing.consultationId,
                                                                    createdBy: user.id,
                                                                    updatedBy: user.id
                                                                }
                                                                visitorPrescriptionDao.insert(visitorPrescription, (visitorPrescriptionCreated) => {
                                                                    //callback(visitorPrescriptionCreated);
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        }
                                    });
                                });
                                var audit = new AuditModel({
                                    senderId: doctor.id,
                                    receiverId: group.id,
                                    receiverType: 'group',
                                    mode: 'doctor',
                                    entityName: 'doctor',
                                    entityEvent: 'add',
                                    createdBy: doctor.id,
                                    updatedBy: doctor.id,
                                    createdTime: Date.now(),
                                    updatedTime: Date.now()
                                });
                                auditService.create(audit, (auditCreated) => {});
                            });
                        });
                        // } else if (notification.status === 'read') {
                        // var group = {
                        //     id: group.id,
                        //     phase: 'inactive',
                        //     details: group.details
                        // };
                        //emit one-by-one for all users
                        //will have to check this in the prod
                        // groupService.update(group, () => {
                        //         groupService.getUsersByGroupId(notification.content.consultationId, (user) => {
                        //             io.in(user.socketId).emit('receive-user-added', {
                        //                 message: `Dr. ${doctor.firstname} ${doctor.lastname} joined the group`,
                        //                 doctorId: doctor.id
                        //             }); //emit one-by-one for all users
                        //         });
                        //     });
                        // groupService.getAllUsersInGroup(groupId).then((allUsers) => {
                        //     let count = 0;
                        //     allUsers.map((user) => {
                        //         if (user.role !== 'bot' && user.status === 'online') {
                        //             count++;
                        //         }
                        //     })
                        //     if (count > 1) {
                        //         log.info('Group status Update with ID: ' + groupId + ' online');
                        //         allUsers.map((user) => {
                        //             if (user.role !== 'bot') {
                        //                 io.in(user.socketId).emit('received-group-status', { 'groupId': groupId, 'groupStatus': 'online' });
                        //             }
                        //         })
                        //         groupService.updateGroupStatus(groupId, 'online', (result) => {
                        //             result === 1 ? log.info("Group status updated in DB for ID: " + groupId + ' to online') : null;
                        //         })
                        //     }
                        // })
                        // var audit = new AuditModel({
                        //     senderId: doctor.id,
                        //     receiverId: group.id,
                        //     receiverType: 'group',
                        //     mode: 'doctor',
                        //     entityName: 'doctor',
                        //     entityEvent: 'add',
                        //     createdBy: doctor.id,
                        //     updatedBy: doctor.id,
                        //     createdTime: Date.now(),
                        //     updatedTime: Date.now()
                        // });
                        // auditService.create(audit, (auditCreated) => {});
                    } else {
                        return;
                    }
                });
            });

            /**
             * user or doctor added to consultation group
             */
            socket.on('end-consultation', (doctor, group) => {
                visitorModel.visitor_appointment.update({ status: 'Completed' }, {
                    where: {
                        groupId: group.id,
                        doctorId: doctor.id
                    }
                }).then(() => {});
                groupService.getUsersByGroupId(group.id, (user) => {
                    // if (user.id === doctor.id) {
                    let socketIds = [];
                    socketIds = user.socketId;
                    if (socketIds !== null) {
                        socketIds.map((socketId) => {
                            io.in(socketId).emit('receive-end-consultation', {
                                message: `Dr. ${doctor.firstname} ${doctor.lastname} left the conversation`,
                                groupId: group.id,
                                socketId: socket.id
                            }); //emit one-by-one for all users
                        });
                    }
                    // }
                });
                groupDao.readById(group.id, (result) => {
                        var newGroup = {
                            id: group.id,
                            phase: 'botInactive',
                            details: result.details
                        };
                        console.log(newGroup)
                        groupService.update(newGroup, (res) => {
                            console.log(res);
                        })
                    })
                    //group phase = notArchived;    

                // commenting it for the timebeing to avoid group deletionr
                // groupService.deleteGroupUserMap(doctor.id, group.id, () => {
                // group.phase = 'inactive';
                // groupService.update(group, () => {
                // groupService.getAllUsersInGroup(groupId).then((allUsers) => {
                //     let count = 0;
                //     allUsers.map((user) => {
                //         if (user.role !== 'bot' && user.status === 'online') {
                //             count++;
                //         }
                //     })
                //     if (count < 2) {
                //         log.info('Group status Update with ID: ' + groupId + ' offline');
                //         allUsers.map((user) => {
                //             if (user.role !== 'bot') {
                //                 io.in(user.socketId).emit('received-group-status', { 'groupId': groupId, 'groupStatus': 'offline' });
                //             }
                //         })
                //         groupService.updateGroupStatus(groupId, 'offline', (result) => {
                //             result === 1 ? log.info("Group status updated in DB for ID: " + groupId + ' to offline') : null;
                //         })
                //     }
                // });
                // });
                var audit = new AuditModel({
                    senderId: doctor.id,
                    receiverId: group.id,
                    receiverType: 'group',
                    mode: 'doctor',
                    entityName: 'doctor',
                    entityEvent: 'remove',
                    createdBy: doctor.id,
                    updatedBy: doctor.id,
                    createdTime: Date.now(),
                    updatedTime: Date.now()
                });
                auditService.create(audit, (auditCreated) => {});
                // });
            });

            socket.on('user-disconnect', (userId) => {
                socket.disconnect();
                userService.getById(userId, (user) => {
                    if (user.id === userId) {
                        //find the index position of the given socketId and then delete from the list
                        let socketId = [];
                        if (user.socketId !== null) {
                            socketId = user.socketId;
                        }
                        socketId.splice(socketId.indexOf(socket.id), 1);
                        userService.updateRegisteredUser({
                            'id': userId,
                            'status': 'offline',
                            'socketId': socketId
                        }, (user) => {
                            log.info('User logged out: ', userId);
                            if (user) {
                                //         consultationGroupModel.consultation_group.findAll({where:{userId:userId,name:'MedHelp'}}).then((result)=>{
                                //             if(result){
                                //         groupService.getAllGroupMapsByUserId(userId, (gumaps) => {

                                //             gumaps.map((gumap) => {
                                //                 if(result.id !== gumap.groupId){
                                //                 groupService.getAllUsersInGroup(gumap.groupId).then((allUsers) => {
                                //                     let count = 0;
                                //                     allUsers.map((user) => {
                                //                         if (user.role !== 'bot' && user.status === 'online') {
                                //                             count++;
                                //                         }
                                //                     })
                                //                     if (count < 2) {
                                //                         log.info('Group status update with ID: ' + gumap.groupId + ' offline');
                                //                         allUsers.map((user) => {
                                //                             if (user.role !== 'bot' && user.id !== userId) {
                                //                                 io.in(user.socketId).emit('received-group-status', { 'groupId': gumap.groupId, 'groupStatus': 'offline' });
                                //                             }
                                //                         })
                                //                         groupService.updateGroupStatus(gumap.groupId, 'offline', (result) => {
                                //                             result === 1 ? log.info("Group status updated in DB for ID: " + gumap.groupId + ' to offline') : null;
                                //                         })
                                //                     }
                                //                 })
                                //             }
                                //             })
                                //         })
                                //     }
                                // })
                            } else {
                                return;
                            }
                        });
                    }
                });
                var audit = new AuditModel({
                    senderId: userId,
                    receiverId: '',
                    receiverType: '',
                    mode: '',
                    entityName: 'visitor',
                    entityEvent: 'logout',
                    createdBy: userId,
                    updatedBy: userId,
                    createdTime: Date.now(),
                    updatedTime: Date.now()
                });
                auditService.create(audit, (auditCreated) => {});
            });

        });

    function scheduler() {
        log.info('Scheduler called at ', moment(Date.now()).format());
        notificationService.readByTime((allNotifications) => {
            allNotifications.map((notification) => {
                userService.getById(notification.userId, (user) => {
                    if (notification.status === 'created') {
                        let socketIds = [];
                        socketIds = user.socketId;
                        if (socketIds !== null) {
                            socketIds.map((socketId) => {
                                io.in(socketId).emit('consult-notification', {
                                    notification: notification
                                });
                            });
                        }

                        var updateNotification = {
                            id: notification.id,
                            template: notification.template,
                            userId: notification.userId,
                            type: notification.type,
                            title: notification.title,
                            content: notification.content,
                            status: "sent",
                            channel: notification.channel,
                            priority: 1,
                            triggerTime: notification.triggerTime,
                            createdBy: notification.createdBy,
                            updatedBy: notification.updatedBy
                        };
                        notificationModel.notification.update(updateNotification, {
                                where: {
                                    id: updateNotification.id
                                }

                            })
                            .then((res) => {
                                log.info('notification updated.');
                            }).catch((err) => {
                                log.error('error' + err);
                            });
                    } else {
                        return;
                    }
                });
            });
        });
    }
    setInterval(scheduler, 40000);
}