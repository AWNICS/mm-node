/*
DAO for Group api
*/

// Require Mongoose
var mongoose = require('mongoose');

// Require model
var Group = require('./group.model');

exports.createGroup = (req, res) => {

    //create a new group
    var group = new Group({
        id: req.body.id,
        userIds: req.body.userIds,
        createdAt: req.body.createdAt
    });

    // Call the built-in save method to save to the database
    group.save((err, group) => {
        if (err) throw err;
        console.log('Group created successfully');
        res.send('Group created: ' + JSON.stringify(group));
    });
}

exports.getAllGroups = (req, res) => {
    // get all the groups
    Group.find({}, (err, group) => {
        if (err) throw err;

        console.log(group);
        res.send('All groups: ' + JSON.stringify(group));
    });
}

exports.getGroup = (req, res) => {
    // get a specific the group
    Group.find({ id: req.params.id }, (err, group) => {
        if (err) throw err;

        console.log(group);
        res.send('Group: ' + JSON.stringify(group));
    });
}

exports.updateGroup = (req, res) => {

    var group = {
        id: req.body.id,
        userIds: req.body.userIds,
        createdAt: req.body.createdAt
    };

    var condition = { id: req.params.id };
    var options = { multi: true };

    Group.update(condition, group, options, callback);

    function callback(err, numAffected) {
        if (err) throw err;
        console.log('Group updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
        res.send('Group updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
    }
}

exports.deleteGroup = (req, res) => {

    var condition = { id: req.params.id };

    Group.remove(condition, (err) => {
        if (err) throw err;
        console.log('Group removed.');
        res.send('Group removed successfully');
    });
}