/*
DAO for UserClone api
*/

import UserClone from './userClone.model';

exports.create = (userClone, callback) => {
    // Call the built-in save method to save to the database
    userClone.save((err, userClone) => {
        if (err) throw err;
        callback(userClone);
    });
}

exports.getAll = (callback) => {
    // get all the users
    UserClone.find({}, (err, userClones) => {
        if (err) throw err;
        callback(userClones);
    });
}

exports.getById = (id, callback) => {
    // get all the users
    UserClone.find({ id: id }, (err, userClone) => {
        if (err) throw err;
        callback(userClone);
    });
}

exports.update = (userClone, callback) => {
    // update an userClone
    var condition = { id: userClone.id };
    var options = { multi: true };

    UserClone.update(condition, userClone, options, callback);

    function callback(err, numAffected) {
        if (err) throw err;
    }
}

exports.delete = (id, callback) => {
    // delete an userClone
    var condition = { id: id };

    UserClone.remove(condition, (err, userClone) => {
        if (err) throw err;
        callback(userClone);
    });
}