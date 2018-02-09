import MessageService from '../apis/message/message.service';
import GroupService from '../apis/group/group.service';
import log from '../config/log4js.config';
import UserService from '../apis/user/user.service';
import UserModel from '../apis/user/index';

var messageService = new MessageService();
var groupService = new GroupService();
var userService = new UserService();

exports.connectSocket = (io) => {
    io.on('connection', function(socket) {
        // get userId from client
        socket.on('user-connected', userId => {
            console.log('a user connected with ID: ' + userId);

            userService.getById(userId, (user) => {
                if (user.id === userId) {
                    userService.updateRegisteredUser({ 'id': userId, 'socketId': socket.id }, (user) => {});
                }
            });

            //user disconnected
            socket.on('disconnect', () => {
                console.log('user disconnected with ID: ' + userId);
            });
        });

        /**
         * for sending message to group/user which is emitted from client(msg with an groupId/userId)
         */
        socket.on('send-message', (msg) => {
            // if it is a group message
            if (msg.receiverType === "group") {
                userService.getById(msg.senderId, (result) => {
                    msg.createdBy = result.name;
                    msg.picUrl = result.picUrl;
                    messageService.sendMessage(msg, (result) => {});
                });
                groupService.getAllUsersByGroupId(msg.receiverId)
                    .then((users) => {
                        users.map(user => {
                            io.in(user.socketId).emit('receive-message', msg); //emit one-by-one for all users
                        });
                    });
            }
            // if it is a private message 
            else if (msg.receiverType === "private") {
                userService.getById(msg.senderId, (result) => {
                    msg.createdBy = result.name;
                    msg.picUrl = result.picUrl;
                    messageService.sendMessage(msg, (result) => {});
                });
                userService.getById(msg.receiverId, (result) => {
                    socket.to(result.socketId).emit('receive-message', msg);
                })
            }
            // if neither group nor user is selected
            else {
                userService.getById(msg.senderId, (result) => {
                    socket.to(result.socketId).emit('receive-message', { "text": 'Select a group or an user to chat with.' }); //only to sender
                });
            }
        });

        socket.on('send-typing', (data) => {
            // if it is a group message
            if (data.receiverType === "group") {
                groupService.getAllUsersByGroupId(data.receiver.id)
                    .then((users) => {
                        users.map(user => {
                            socket.to(user.socketId).emit('receive-typing', data); //emit one-by-one for all users
                        });
                    });
            }
            // if it is a private message 
            else if (data.receiverType === "private") {
                userService.getById(data.receiver.id, (result) => {
                    socket.to(result.socketId).emit('receive-typing', data);
                });
            }
            // if neither group nor user is selected
            else {
                console.log('There has been an error');
            }
        });

        /**
         * for updating the message in mongo
         */
        socket.on('update-message', (data) => {
            messageService.update(data, (res) => {
                groupService.getAllUsersByGroupId(data.receiverId)
                    .then((users) => {
                        users.map(user => {
                            io.in(user.socketId).emit('receive-message', res); //emit one-by-one for all users
                        });
                    });
            });
        });
    });
}