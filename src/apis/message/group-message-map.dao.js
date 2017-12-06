/*
DAO for Group-Message-Map api
*/

// Require Mongoose
import mongoose from 'mongoose';

// Require model
import GroupMessageMap from './group-message-map.model';

exports.createGroupMessageMap = (req, res) => {

    var groupMessageMap = new GroupMessageMap({
        groupId: req.body.groupId,
        userSId: req.body.userSId,
        messageId: req.body.messageId
    });

    groupMessageMap.save((err, groupMessageMap) => {
        if (err) throw err;
        console.log('GroupMessageMap created successfully');
        res.send('GroupMessageMap created: ' + JSON.stringify(groupMessageMap));
    });
}

exports.getAllGroupMessageMaps = (req, res) => {
    GroupMessageMap.find({}, (err, groupMessageMap) => {
        if (err) throw err;

        console.log(groupMessageMap);
        res.send('All groupMessageMap: ' + JSON.stringify(groupMessageMap));
    });
}

exports.updateGroupMessageMap = (req, res) => {

    var groupMessageMap = {
        groupId: req.body.groupId,
        userSId: req.body.userSId,
        messageId: req.body.messageId
    };

    var condition = { messageId: req.params.messageId };
    var options = { multi: true };

    GroupMessageMap.update(condition, groupMessageMap, options, callback);

    function callback(err, numAffected) {
        if (err) throw err;
        console.log('Contact updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
        res.send('Contact updated successfully. Number of rows affected: ' + JSON.stringify(numAffected));
    }
}

exports.deleteGroupMessageMap = (req, res) => {

    var condition = { messageId: req.params.messageId };

    GroupMessageMap.remove(condition, (err) => {
        if (err) throw err;
        console.log('GroupMessageMap removed.');
        res.send('GroupMessageMap removed successfully');
    });
}