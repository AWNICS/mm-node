/*
DAO for messages api
*/

import Message from './message.model';

exports.create = (message, callback) => {

    //create a new message
    message.save((err, message) => {
        if (err) throw err;
        callback(message);
    });
}

exports.getAll = (callback) => {
    // get all the messages
    Message.find({}, (err, messages) => {
        if (err) throw err;
        callback(messages);
    });
}

exports.getById = (id, callback) => {
    // get a specific the message
    Message.find({ id: id }, (err, message) => {
        if (err) throw err;
        callback(message);
    });
}

exports.update = (message, callback) => {
    var condition = { $and: [{ 'senderId': message.senderId }, { 'receiverId': message.receiverId }, { 'createdTime': message.createdTime }] };
    var options = { "new": true }; //multi: true, upsert: true

    Message.findOneAndUpdate(condition, {
        $set: {
            "text": message.text,
            "type": "text",
            "contentType": "text"
        }
    }, options, (message) => {
        callback(message);
    });
}

exports.delete = (id, callback) => {

    var condition = { id: id };

    Message.remove(condition, (err, message) => {
        if (err) throw err;
        callback(message);
    });
}