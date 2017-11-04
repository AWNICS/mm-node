/*
DAO for ContactUs api
*/

// Require Mongoose
var mongoose = require('mongoose');

// Require model
var Message = require('./message.model')
    // Create a new Contact called Arun
var message = new Message({
    id: Date.now(),
    user: 'Sagar',
    picUrl: null,
    text: 'Hello',
    type: 'text',
    status: 'available',
    contentType: 'text',
    contentData: {
        data: ['How are you?']
    },
    responseData: {
        data: ['I am fine']
    },
    lastUpdateTime: Date.now()
});

exports.createMessage = (req, res) => {
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
    // get all the users
    Message.find({ name: 'Sagar' }, (err, message) => {
        if (err) throw err;

        // object of all the users
        console.log(message);
        res.send('Message with name Sagar: ' + JSON.stringify(message));
    });
}

exports.updateMessage = (req, res) => {

    Message.findOne({ name: 'Kiran' }, (err, message) => {

        if (err) throw err;
        // Change the name from Kiran to Karan
        message.name = 'Karan';

        // Save it
        message.save((err) => {
            if (err) throw err;
            console.log('Message updated successfully');
            res.send('Message updated: ' + JSON.stringify(message));
        });
    });
}

exports.deleteMessage = (req, res) => {

    var condition = { name: 'Arun' };

    Message.remove(condition, (err) => {
        if (err) throw err;
        console.log('Message removed.');
        res.send('Message removed successfully');
    });
}