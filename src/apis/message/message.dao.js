/*
DAO for messages api
*/

import Message from './message.model';
import log from '../../config/log4js.config';

exports.create = (message, callback) => {

    //create a new message
    message.save((err, message) => {
        if (err) {
            callback(err);
        } else {
            callback(message);
        }
    });
}

exports.getAll = (callback) => {
    // get all the messages
    Message.find({}, (err, messages) => {
        if (err) {
            callback(err);
        } else {
            callback(messages);
        }
    });
}

exports.getById = (id, callback) => {
    // get a specific the message
    Message.find({ _id: id }, (err, message) => {
        if (err) {
            callback(err);
        } else {
            callback(message);
        }
    });
}

exports.update = (message, callback) => {
    var condition = { $and: [{ 'senderId': message.senderId }, { 'receiverId': message.receiverId }, { 'createdTime': message.createdTime }] };
    var options = { new: true }; //multi: true, upsert: true

    Message.findOneAndUpdate(condition, {
        $set: {
            "text": message.text,
            "type": "text",
            "contentType": "text"
        }
    }, options, (err, message) => {
        if (err) {
            callback(err);
        } else {
            callback(message);
        }
    });
}

exports.delete = (id, callback) => {
    var condition = { _id: id };
    Message.remove(condition, (err, message) => {
        if (err) {
            callback({ message: 'Error deleting the message. Please try again' });
        } else if (JSON.parse(message).n > 0) {
            callback({ message: 'Message deleted successfully' });
        } else {
            callback({ message: 'Message could not be found' });
        }
    });
}