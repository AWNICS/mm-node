import MessageService from '../apis/message/message.service';
import GroupService from '../apis/group/group.service';
import log from '../config/log4js.config';
import UserService from '../apis/user/user.service';

var messageService = new MessageService();
var groupService = new GroupService();
var userService = new UserService();

exports.connectSocket = (io) => {
    io.on('connection', function(socket) {

        // get userId from client
        socket.on('user-connected', userId => {
            console.log('a user connected with ID: ' + userId);
            console.log('socketId', socket.id);

            //user disconnected
            socket.on('disconnect', () => {
                console.log('user disconnected with ID: ' + userId);
            });
        });

        /**
         * for sending message to group/user which is emitted from client(msg with an groupId/userId)
         */
        socket.on('send-message', (msg) => {
            if (msg.receiverType === "group" || "private") {
                /*groupService.getAllUsersByGroupId(msg.receiverId)
                    .then((users) => {
                        users.map(user => {
                            msg.createdBy = user.name;
                            msg.picUrl = user.picUrl;
                            socket.broadcast.emit('receive-message', msg);
                            // io.in(user.id).emit('receive-message', msg); //emit one-by-one for all users
                        });
                    });*/
                userService.getById(msg.senderId, (result) => {
                    msg.createdBy = result.name;
                    msg.picUrl = result.picUrl;
                    io.emit('receive-message', msg);
                    messageService.sendMessage(msg, (result) => {});
                });
            } else {
                io.emit('receive-message', { "text": 'Something went wrong. Please try again.' }); //only to sender
            }
        });
    });
}