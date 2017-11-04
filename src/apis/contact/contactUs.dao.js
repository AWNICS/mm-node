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

// Create a new Contact called Arun
var contact = new Contact({
    id: Date.now(),
    name: 'Arjun',
    picUrl: null,
    regNo: 'abc1234',
    briefDescription: {
        speciality: 'GP',
        experience: 4,
        description: 'GP with 4 years exp'
    },
    contact: {
        phone: '8970074777',
        email: 'arun.gdg@gmail.com'
    },
    status: 'available',
    waitingTime: '10',
    rating: '4',
    videoUrl: null,
    appearUrl: null,
    thumbnailUrl: null,
    lastUpdateTime: Date.now(),
    termsAccepted: true
});

exports.createContact = (req, res) => {
    // Call the built-in save method to save to the database
    contact.save((err, contact) => {
        if (err) throw err;

        console.log('Contact created successfully');
        res.send('Contact saved is: ' + JSON.stringify(contact));
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
    Contact.find({ name: 'Sagar' }, (err, contact) => {
        if (err) throw err;

        // object of all the users
        console.log(contact);
        res.send('Contacts named sagar: ' + JSON.stringify(contact));
    });
}

exports.updateContact = (req, res) => {

    Contact.findOne({ name: 'Karan' }, (err, contact) => {

        if (err) throw err;
        // Change the name from Kiran to Karan
        contact.name = 'Kiran';

        // Save it
        contact.save((err) => {
            if (err) throw err;
            console.log('Contact updated successfully');
            res.send('Updated contact is: ' + JSON.stringify(contact));
        });
    });
}

exports.deleteContact = (req, res) => {

    var condition = { name: 'Kiran' };

    Contact.remove(condition, (err) => {
        if (err) throw err;
        console.log('Contact removed.');
        res.send('Contact removed!');
    });
}