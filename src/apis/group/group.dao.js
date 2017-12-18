/*
DAO for Group api
*/

// Require model
var Group = require('./group.model');

exports.create = (group, callback) => {
    // Call the built-in save method to save to the database
    group.save((err, group) => {
        if (err) throw err;
        callback(group);
    });
}

exports.getAll = (callback) => {
    // get all the groups
    Group.find({}, (err, groups) => {
        if (err) throw err;
        callback(groups)
    });
}

exports.getById = (id, callback) => {
    // get a specific the group
    Group.find({ id: id }, (err, group) => {
        if (err) throw err;
        callback(group);
    });
}

exports.update = (group, callback) => {
    var condition = { id: group.id };
    var options = { multi: true };

    Group.update(condition, group, options, callback);

    function callback(err, numAffected) {
        if (err) throw err;
    }
}

exports.delete = (id, callback) => {

    var condition = { id: id };

    Group.remove(condition, (err, response) => {
        if (err) throw err;
        callback(response);
    });
}