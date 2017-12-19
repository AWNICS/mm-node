/*
DAO for Group api
*/

// Require model
var GroupClone = require('./groupClone.model');

exports.create = (groupClone, callback) => {
    // Call the built-in save method to save to the database
    groupClone.save((err, groupClone) => {
        if (err) throw err;
        callback(groupClone);
    });
}

exports.getAll = (callback) => {
    // get all the groups
    GroupClone.find({}, (err, groupClones) => {
        if (err) throw err;
        callback(groupClones)
    });
}

exports.getById = (id, callback) => {
    // get a specific the group
    GroupClone.find({ id: id }, (err, groupClone) => {
        if (err) throw err;
        callback(groupClone);
    });
}

exports.update = (groupClone, callback) => {
    var condition = { id: groupClone.id };
    var options = { multi: true };

    GroupClone.update(condition, groupClone, options, callback);

    function callback(err, numAffected) {
        if (err) throw err;
    }
}

exports.delete = (id, callback) => {

    var condition = { id: id };

    GroupClone.remove(condition, (err, response) => {
        if (err) throw err;
        callback(response);
    });
}