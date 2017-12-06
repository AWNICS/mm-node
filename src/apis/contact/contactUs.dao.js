/*
DAO for contact api
*/

// Require Mongoose
var mongoose = require('mongoose');

// Require model
var Contact = require('./contactUs.model');

import log4js from 'log4js';
log4js.configure('./src/config/log4js.json');
var log = log4js.getLogger("startup");

exports.createContact = (req, res) => {

    // create a new entry
    var contactUs = new Contact({
        id: req.body.id,
        name: req.body.name,
        picUrl: req.body.picUrl,
        regNo: req.body.regNo,
        briefDescription: {
            speciality: req.body.briefDescription.speciality,
            experience: req.body.briefDescription.experience,
            description: req.body.briefDescription.description
        },
        contact: {
            phone: req.body.contact.pone,
            email: req.body.contact.phone
        },
        status: req.body.status,
        waitingTime: req.body.waitingTime,
        rating: req.body.rating,
        videoUrl: req.body.videoUrl,
        appearUrl: req.body.appearUrl,
        thumbnailUrl: req.body.thumbnailUrl,
        lastUpdateTime: req.body.lastUpdateTime,
        termsAccepted: req.body.termsAccepted
    });
    // Call the built-in save method to save to the database
    contactUs.save((err, contactUs) => {
        if (err) throw err;

        console.log('Contact created successfully');
        res.send('Contact saved is: ' + JSON.stringify(contactUs));
    });
}

exports.getAllContacts = (req, res) => {
    // get all the users
    Contact.find({}, (err, contacts) => {
        if (err) throw err;

        // object of all the users
        console.log(contacts);
        res.send('All contacts: ' + JSON.stringify(contacts));
    });
}

exports.getContact = (req, res) => {
    // get all the users
    Contact.find({ id: req.params.id }, (err, contactUs) => {
        if (err) throw err;

        // object of all the users
        console.log(contactUs);
        res.send('Contacts named sagar: ' + JSON.stringify(contactUs));
    });
}

exports.updateContact = (req, res) => {

    var contactUs = {
        name: req.body.name,
        picUrl: req.body.picUrl,
        regNo: req.body.regNo,
        briefDescription: {
            speciality: req.body.briefDescription.speciality,
            experience: req.body.briefDescription.experience,
            description: req.body.briefDescription.description
        },
        contact: {
            phone: req.body.contact.pone,
            email: req.body.contact.phone
        },
        status: req.body.status,
        waitingTime: req.body.waitingTime,
        rating: req.body.rating,
        videoUrl: req.body.videoUrl,
        appearUrl: req.body.appearUrl,
        thumbnailUrl: req.body.thumbnailUrl,
        lastUpdateTime: req.body.lastUpdateTime,
        termsAccepted: req.body.termsAccepted
    };

    var condition = { id: req.params.id };
    var options = { multi: true };

    Contact.update(condition, contactUs, options, callback);

    function callback(err, numAffected) {
        if (err) throw err;
        console.log('Contact updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
        res.send('Contact updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
    }

    // Save it
    /*contactUs.save((err) => {
        if (err) throw err;
        console.log('Contact updated successfully');
        res.send('Updated contact is: ' + JSON.stringify(contactUs));
    });*/
    //});
}

exports.deleteContact = (req, res) => {

    var condition = { id: req.params.id };

    Contact.remove(condition, (err) => {
        if (err) throw err;
        console.log('Contact removed.');
        res.send('Contact removed!');
    });
}