/*
DAO for ContactUs api
*/

// Require Mongoose
var mongoose = require('mongoose');

// Require model
var DoctorDetails = require('./doctorDetails.model');

// Create a new Contact called Arun
var doctorDetails = new DoctorDetails({
    id: Date.now(),
    name: 'Sagar',
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

exports.createDoctorDetails = (req, res) => {
    // Call the built-in save method to save to the database
    doctorDetails.save((err, doctorDetails) => {
        if (err) throw err;

        console.log('DoctorDetails created successfully');
        res.send('DoctorDetails created: ' + JSON.stringify(doctorDetails));
    });
}

exports.getAllDoctorDetails = (req, res) => {
    // get all the users
    DoctorDetails.find({}, (err, doctorDetails) => {
        if (err) throw err;

        // object of all the users
        console.log(doctorDetails);
        res.send('All doctorDetails: ' + JSON.stringify(doctorDetails));
    });
}

exports.getDoctorDetail = (req, res) => {
    // get all the users
    DoctorDetails.find({ name: 'Sagar' }, (err, doctorDetails) => {
        if (err) throw err;

        // object of all the users
        console.log(doctorDetails);
        res.send('DoctorDetail by name: ' + JSON.stringify(doctorDetails));
    });
}

exports.updateDoctorDetails = (req, res) => {

    DoctorDetails.findOne({ name: 'Kiran' }, (err, doctorDetails) => {

        if (err) throw err;
        // Change the name from Kiran to Karan
        doctorDetails.name = 'Karan';

        // Save it
        doctorDetails.save((err) => {
            if (err) throw err;
            console.log('DoctorDetails updated successfully');
            res.send('DoctorDetails updated: ' + JSON.stringify(doctorDetails));
        });
    });
}

exports.deleteDoctorDetails = (req, res) => {

    var condition = { name: 'Arun' };

    DoctorDetails.remove(condition, (err) => {
        if (err) throw err;
        console.log('DoctorDetails removed.');
        res.send('DoctorDetails deleted successfully');
    });
}