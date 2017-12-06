/*
DAO for ContactUs api
*/

// Require Mongoose
var mongoose = require('mongoose');

// Require model
var Message = require('./message.model');

exports.createMessage = (req, res) => {

    //create a new entry
    var message = new Message({
        id: req.body.id,
        receiverId: req.body.receiverId,
        senderId: req.body.senderId,
        picUrl: req.body.picUrl,
        text: req.body.text,
        type: req.body.type,
        status: req.body.status,
        contentType: req.body.contentType,
        contentData: {
            data: req.body.contentData.data
        },
        responseData: {
            data: req.body.responseData.data
        },
        lastUpdateTime: req.body.lastUpdateTime
    });
    // Call the built-in save method to save to the database
    message.save((err, message) => {
        if (err) throw err;
        console.log('Message created successfully');
        res.send('Message created: ' + JSON.stringify(message));
    });
}

exports.getAllMessages = (req, res) => {
    // get all the users
    Message.find({}, (err, message) => {
        if (err) throw err;

        // object of all the users
        console.log(message);
        res.send('All messages: ' + JSON.stringify(message));
    });
}

exports.getMessage = (req, res) => {
    // get a specific the user
    Message.find({ id: req.params.id }, (err, message) => {
        if (err) throw err;

        // object of all the users
        console.log(message);
        res.send('Message with name Sagar: ' + JSON.stringify(message));
    });
}

exports.updateMessage = (req, res) => {

    var message = {
        receiverId: req.body.receiverId,
        senderId: req.body.senderId,
        picUrl: req.body.picUrl,
        text: req.body.text,
        type: req.body.type,
        status: req.body.status,
        contentType: req.body.contentType,
        contentData: {
            data: req.body.contentData.data
        },
        responseData: {
            data: req.body.responseData.data
        },
        lastUpdateTime: req.body.lastUpdateTime
    };

    var condition = { id: req.params.id };
    var options = { multi: true };

    Message.update(condition, message, options, callback);

    function callback(err, numAffected) {
        if (err) throw err;
        console.log('Contact updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
        res.send('Contact updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
    }
}

exports.deleteMessage = (req, res) => {

    var condition = { id: req.params.id };

    Message.remove(condition, (err) => {
        if (err) throw err;
        console.log('Message removed.');
        res.send('Message removed successfully');
    });
}