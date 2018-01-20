import MessageService from '../apis/message/message.service';
import GroupService from '../apis/group/group.service';
import log from '../config/log4js.config';

var messageService = new MessageService();
var groupService = new GroupService();

exports.connectSocket = (io) => {
    io.on('connection', function(socket) {

        // get userId from client
        socket.on('user-connected', userId => {
            console.log('a user connected with ID: ' + userId);

            //user disconnected
            socket.on('disconnect', () => {
                console.log('user disconnected with ID: ' + userId);
            });
        });

        /**
         * for sending message to group/user which is emitted from client(msg with an groupId/userId)
         */
        socket.on('send-message', (msg) => {
            messageService.sendMessage(msg, (result) => {
                log.info('message received is: ' + JSON.stringify(result));
            });
            if (msg.receiverType === "group") {
                groupService.getAllUsersByGroupId(msg.receiverId)
                    .then((users) => {
                        users.map(user => {
                            io.emit('send-message', msg); //emit one-by-one for all users
                        });
                    });
            } else if (msg.receiverType === "private") {
                log.info('msg details: ' + JSON.stringify(msg));
                socket.join(msg.receiverId);
                io.to(msg.receiverId).to(msg.senderId).emit('send-message', msg); //send to only sender and receiver
            } else {
                io.to(msg.senderId).emit('send-message', { "text": 'Please try again' }); //only to sender
            }
        });

        /**
         * for receiving message sent by client
         */
    });
}