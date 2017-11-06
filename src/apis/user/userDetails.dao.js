/*
DAO for ContactUs api
*/

// Require Mongoose
var mongoose = require('mongoose');

// Require model
var UserDetails = require('./userDetails.model')


// Create a new UserDetails called Arun
var userDetails = new UserDetails({
    id: 21,
    name: 'Raghu',
    email: 'raghu@mail.com',
    phoneNo: '8970074777',
    picUrl: null,
    briefDescription: {
        description: null
    },
    status: 'away',
    waitingTime: '10',
    rating: '3',
    lastUpdateTime: Date.now()
});

exports.createUserDetails = (req, res) => {
    // Call the built-in save method to save to the database
    userDetails.save((err, userDetails) => {
        if (err) throw err;

        console.log('UserDetails created successfully');
        res.send('UserDetails created: ' + JSON.stringify(userDetails));
    });
}

exports.getAllUserDetails = (req, res) => {
    // get all the users
    UserDetails.find({}, (err, userDetails) => {
        if (err) throw err;

        // object of all the users
        console.log(userDetails);
        res.send('All UserDetails: ' + JSON.stringify(userDetails));
    });
}

exports.getUserDetail = (req, res) => {
    // get all the users
    UserDetails.find({ name: 'Sagar' }, (err, userDetails) => {
        if (err) throw err;

        // object of all the users
        console.log(userDetails);
        res.send('UserDetails with name Sagar: ' + JSON.stringify(userDetails));
    });
}

exports.updateUserDetails = (req, res) => {

    UserDetails.findOne({ name: 'Kiran' }, (err, userDetails) => {

        if (err) throw err;
        // Change the name from Kiran to Karan
        userDetails.name = 'Karan';

        // Save it
        userDetails.save((err) => {
            if (err) throw err;
            console.log('UserDetails updated successfully');
            res.send('UserDetails updated: ' + JSON.stringify(userDetails));
        });
    });
}

exports.deleteUserDetails = (req, res) => {

    var condition = { name: 'Arun' };

    UserDetails.remove(condition, (err) => {
        if (err) throw err;
        console.log('UserDetails removed.');
        res.send('UserDetails removed.');
    });
}