var log = require('../config/log4js.config');

exports.connectSocket = (io) => {
    io.on('connection', function(socket) {
        log.info('a user connected');
        socket.on('disconnect', function() {
            log.info('user disconnected');
        });

        socket.on('chat', function(msg) {
            socket.broadcast.emit('chat', msg);
            // room codes will be generated dynamically
            log.info('Message sent is: ' + msg);
        });
    });
}

/**
 * save the messages into mongo
 * each user will have his own id(user id or user name)
 * each user will have a set of contacts to which he/she can talk to
 * each user can talk to other user/group only on approval of the request.
 * 
 */