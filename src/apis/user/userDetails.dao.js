/*
DAO for ContactUs api
*/

// Require Mongoose
var mongoose = require('mongoose');

// Require model
var UserDetails = require('./userDetails.model')

exports.createUserDetails = (req, res) => {

    //create a new entry
    var userDetails = new UserDetails({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        picUrl: req.body.picUrl,
        briefDescription: {
            description: req.body.briefDescription.description
        },
        status: req.body.status,
        waitingTime: req.body.waitingTime,
        rating: req.body.rating,
        lastUpdateTime: req.body.lastUpdateTime
    });
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
    UserDetails.find({ id: req.params.id }, (err, userDetails) => {
        if (err) throw err;

        // object of all the users
        console.log(userDetails);
        res.send('UserDetails with name Sagar: ' + JSON.stringify(userDetails));
    });
}

exports.updateUserDetails = (req, res) => {

    // update the required parameters
    var userDetails = {
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        picUrl: req.body.picUrl,
        briefDescription: {
            description: req.body.briefDescription.description
        },
        status: req.body.status,
        waitingTime: req.body.waitingTime,
        rating: req.body.rating,
        lastUpdateTime: req.body.lastUpdateTime
    };

    var condition = { id: req.params.id };
    var options = { multi: true };

    UserDetails.update(condition, userDetails, options, callback);

    function callback(err, numAffected) {
        if (err) throw err;
        console.log('Contact updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
        res.send('Contact updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
    }
}

exports.deleteUserDetails = (req, res) => {

    var condition = { id: req.params.id };

    UserDetails.remove(condition, (err) => {
        if (err) throw err;
        console.log('UserDetails removed.');
        res.send('UserDetails removed.');
    });
}