/*
DAO for GroupUserMapClone api
*/

// Require model
var GroupUserMapClone = require('./groupUserMapClone.model');

exports.create = (groupUserMapClone, callback) => {
    // Call the built-in save method to save to the database
    groupUserMapClone.save((err, groupUserMapClone) => {
        if (err) throw err;
        callback(groupUserMapClone);
    });
}

exports.getAll = (callback) => {
    // get all the groupUserMapClones
    GroupUserMapClone.find({}, (err, groupUserMapClones) => {
        if (err) throw err;
        callback(groupUserMapClones)
    });
}

exports.getById = (id, callback) => {
    // get a specific the groupUserMapClone
    GroupUserMapClone.find({ id: id }, (err, groupUserMapClone) => {
        if (err) throw err;
        callback(groupUserMapClone);
    });
}

exports.update = (groupUserMapClone, callback) => {
    var condition = { id: groupUserMapClone.id };
    var options = { multi: true };

    GroupUserMapClone.update(condition, groupUserMapClone, options, callback);

    function callback(err, numAffected) {
        if (err) throw err;
    }
}

exports.delete = (id, callback) => {

    var condition = { id: id };

    GroupUserMapClone.remove(condition, (err, response) => {
        if (err) throw err;
        callback(response);
    });
}