import log from '../../config/log4js.config';
/*
DAO for Group-Message-Map api
*/

// Require model
import GroupMessageMap from './group-message-map.model';

exports.create = (groupMessageMap, callback) => {
    groupMessageMap.save((err, groupMessageMap) => {
        if (err) {
            log.error('Error in creating groupMessageMap ', err);
            throw err;
        } else {
            callback(groupMessageMap);
        }
    });
}

exports.getAll = (callback) => {
    GroupMessageMap.find({}, (err, groupMessageMap) => {
        if (err) throw err;
        callback(groupMessageMap);
    });
}

exports.getById = (id, callback) => {
    GroupMessageMap.findOne({ messageId: id }, (err, groupMessageMap) => {
        if (err) throw err;
        callback(groupMessageMap);
    });
}

exports.update = (groupMessageMap, callback) => {
    var condition = { messageId: groupMessageMap.messageId };
    var options = { multi: true };

    GroupMessageMap.update(condition, groupMessageMap, options,
        (err, numAffected) => {
            if (err) {
                callback({ 'error': err });
            } else {
                callback(groupMessageMap);
            }
        });
}

exports.delete = (id, callback) => {
    var condition = { messageId: id };
    GroupMessageMap.remove(condition, (err, groupMessageMap) => {
        if (err) {
            callback({ 'error': err });
        } else {
            callback(groupMessageMap);
        }
    });
}