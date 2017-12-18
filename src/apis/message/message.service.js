/**
 * 1. create
 * 2. 
 */

import messageDao from './message.dao';
import userMapDao from './user-message-map.dao';
import groupMapDao from './group-message-map.dao';
import Message from './message.model';
import GroupMessageMap from './group-message-map.model';
import UserMessageMap from './user-message-map.model';
import Status from '../../util/status.message';

class MessageService {
    constructor() {}

    sendMessage(message, callback) {
        if (message.receiverType === 'group') {
            this.sendGroupMessage(message, callback);
        } else {
            this.sendUserMessage(message, callback)
        }
    }

    sendGroupMessage(message, callback) {

        //createMessage and createGroupMap using DAO object
        var msg = new Message(message);
        var grpMessage = new GroupMessageMap({
            messageId: msg.id,
            groupId: message.receiverId,
            userSId: message.senderId,
            createdBy: message.senderId,
            updatedBy: message.senderId,
            createdTime: new Date(),
            updatedTime: new Date()
        });
        messageDao.create(msg, callback);
        groupMapDao.create(grpMessage, callback);
    }

    sendUserMessage(message, callback) {
        //createMessage and createUserMap using DAO object
        var msg = new Message(message);
        var userMessage = new UserMessageMap({
            messageId: msg.id,
            userRId: message.receiverId,
            userSId: message.senderId,
            createdBy: message.senderId,
            updatedBy: message.senderId,
            createdTime: new Date(),
            updatedTime: new Date()
        });
        messageDao.create(msg, callback);
        userMapDao.create(userMessage, callback);
    }

    readAllMessages(callback) {
        messageDao.getAll(callback);
    }

    readMessageById(id, callback) {
        messageDao.getById(id, callback);
    }

    removeMessage(id, callback) {
        messageDao.delete(id, callback);
    }

    updateMessage(message, callback) {
        messageDao.update(message, callback);
    }
}

export default MessageService;