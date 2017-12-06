/*
DAO for ContactUs api
*/

// Require Mongoose
var mongoose = require('mongoose');

// Require model
var DoctorDetails = require('./doctorDetails.model');

exports.createDoctorDetails = (req, res) => {

    //create a new entry
    var doctorDetails = new DoctorDetails({
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
            phone: req.body.contact.phone,
            email: req.body.contact.email
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
    DoctorDetails.find({ id: req.params.id }, (err, doctorDetails) => {
        if (err) throw err;

        // object of all the users
        console.log(doctorDetails);
        res.send('DoctorDetail by name: ' + JSON.stringify(doctorDetails));
    });
}

exports.updateDoctorDetails = (req, res) => {

    // update the required parameters
    var doctorDetails = {
        name: req.body.name,
        picUrl: req.body.picUrl,
        regNo: req.body.regNo,
        briefDescription: {
            speciality: req.body.briefDescription.speciality,
            experience: req.body.briefDescription.experience,
            description: req.body.briefDescription.description
        },
        contact: {
            phone: req.body.contact.phone,
            email: req.body.contact.email
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

    DoctorDetails.update(condition, doctorDetails, options, callback);

    function callback(err, numAffected) {
        if (err) throw err;
        console.log('Contact updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
        res.send('Contact updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
    }
}

exports.deleteDoctorDetails = (req, res) => {

    var condition = { id: req.params.id };

    DoctorDetails.remove(condition, (err) => {
        if (err) throw err;
        console.log('DoctorDetails removed.');
        res.send('DoctorDetails deleted successfully');
    });
}