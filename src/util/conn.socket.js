var log = require('../config/log4js.config');

exports.connectSocket = (io) => {
    //connect the socket with frontend.
    io.on('connection', function(socket) {
        log.info('a user connected');
        //when user 1st tym connect
        /* socket.on('connect', function() {
             log.info('a user connected')
         });
         //when user disconnect from user
         socket.on('disconnect', function() {
             log.info('user disconnected');
         });

         socket.on('chat', function(msg) {
             socket.broadcast.emit('chat', msg);
             // room codes will be generated dynamically
             log.info('Message sent is: ' + msg);
         });
         //implementation of Typing
         socket.on('typing', function() {
             socket.broadcast.emit('typing', userName + 'typing');
         });
         //when user send message to a perticular user
         socket.on('sendchatUser', function(msg) {
             socket.to('userSId').emit('updateChat', msg)
         });
         //1st tym when user enter to the group
         socket.on('newUser', function(userSId, groupId) {
             //to store userid for this socket session
             socket.userid = userSId;
             //to store groupid for this socket session
             socket.grouid = groupId;
             //usernames[username]=username;
             socket.join('groupId');
             socket.emit('updatechat', 'you have connected to ' + groupId + ' group ');
             socket.broadcast.to('groupId').emit('updatechat', userSId + 'join now');
         });
         //send chat message to a perticular group
         socket.on('sendchatGroup', function(msg) {
             // we tell the client to execute 'updatechat' with 2 parameters
             io.sockets.in(socket.groupId).emit('updatechat', socket.username, msg);
         });*/
    });
}

/**
 * save the messages into mongo
 * each user will have his own id(user id or user name)
 * each user will have a set of contacts to which he/she can talk to
 * each user can talk to other user/group only on approval of the request.
 * 
 */

// socket.service.js == any special functions
// functions that determine the sender and reciever
// create it in the user folder.