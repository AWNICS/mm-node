import Config from '../config/app.config';
import MongoConfig from './conn.mongo';
import dotenv from 'dotenv';

//var mongo = require('mongodb').MongoClient();


class SocketConfig {
    constructor() {
        this.mongo = new MongoConfig();
    }
    mchat(io) {
        console.log("mchat method");
        this.mongo.connect();
        io.on('connection', function(socket) {
            console.log('a user connected');
            /* this.mongo.connect('mongodb://localhost:27017/chatMessages', function(err, db) {
                 if (err) {
                     console.warn(err.message);
                 } else {
                     var collection = db.collection('chatMsg');
                     var stream = collection.find().sort().limit(10).stream();
                     stream.on('data', function(chat) {
                         console.log('emitting chat');
                         socket.emit('chat', chat.content);
                     });
                 }
             });*/

            socket.on('disconnect', function() {
                console.log('user disconnected');
            });

            socket.on('chat', function(msg) {
                /* this.mongo.connect('mongodb://localhost:27017/chatMessages', function(err, db) {
                     if (err) {
                         console.warn(err.message);
                     } else {
                         var collection = db.collection('chatMsg');
                         collection.insert({ content: msg }, function(err, o) {
                             if (err) { console.warn(err.message); } else { console.log("chat message inserted into db: " + msg); }
                         });
                     }
                 });*/

                socket.broadcast.emit('chat', msg);
            });
        });
    }
}
export default SocketConfig;