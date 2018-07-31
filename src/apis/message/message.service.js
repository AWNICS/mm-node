import messageDao from './message.dao';
import userMapDao from './user-message-map.dao';
import groupMapDao from './group-message-map.dao';
import Message from './message.model';
import GroupMessageMap from './group-message-map.model';
import UserMessageMap from './user-message-map.model';
import Status from '../../util/status.message';
import log from '../../config/log4js.config';

class MessageService {

    sendMessage(message, callback) {
        if (message.receiverType === 'group') {
            this.sendGroupMessage(message, callback);
        } else if (message.receiverType === 'private') {
            this.sendUserMessage(message, callback)
        } else {
            return;
        }
    }

    sendGroupMessage(message, callback) {
        //createMessage and createGroupMap using DAO object
        var msg = new Message(message);
        messageDao.create(msg, (result) => {
            var grpMessage = new GroupMessageMap({
                messageId: result._id,
                groupId: message.receiverId,
                userSId: message.senderId,
                createdBy: message.senderId,
                updatedBy: message.senderId
            });
            groupMapDao.create(grpMessage, (groupMesasgeMap) => {});
            callback(result);
        });
    }

    sendUserMessage(message, callback) {
        //createMessage and createUserMap using DAO object
        var msg = new Message(message);
        messageDao.create(msg, (result) => {
            var userMessage = new UserMessageMap({
                messageId: result._id,
                userRId: message.receiverId,
                userSId: message.senderId,
                createdBy: message.senderId,
                updatedBy: message.senderId,
                createdTime: new Date(),
                updatedTime: new Date()
            });
            userMapDao.create(userMessage);
            callback(result);
        });
    }

    readAll(callback) {
        messageDao.getAll(callback);
    }

    readById(id, callback) {
        messageDao.getById(id, callback);
    }

    remove(id, callback) {
        messageDao.delete(id, callback);
    }

    update(message, callback) {
        messageDao.update(message, callback);
    }

    /**
     * render 20 message onclick of any group
     */
    async getLimitedMessages(receiverId, senderId, page, size, callback) {
        var promises = [];
        var groupMessageMaps = await GroupMessageMap.find({ groupId: receiverId })
            .skip(parseInt(((size * page) - size)))
            .limit(parseInt(size))
            .sort({ $natural: -1 });
        groupMessageMaps.map((groupMessageMap) => {
            promises.push(Message.findOne({ _id: groupMessageMap.messageId }));
        });
        var messages = await Promise.all(promises);
        callback(messages);
    }

    /**
     * group_message_map
     */
    readAllGroupMessageMap(callback) {
        groupMapDao.getAll(callback);
    }

    readGroupMessageMapById(id, callback) {
        groupMapDao.getById(id, callback);
    }

    updateGroupMessageMap(message, callback) {
        groupMapDao.update(message, callback);
    }

    removeGroupMessageMap(id, callback) {
        groupMapDao.delete(id, callback);
    }

    /**
     * for getting all media files
     */
    async media(receiverId, page, size, callback) {
        var promises = [];
        var groupMessageMaps = await GroupMessageMap.find({ groupId: receiverId.toString() });
        groupMessageMaps.map((groupMessageMap) => {
            var message = Message.findOne({ $and: [{ _id: groupMessageMap.messageId }, { 'type': { $in: ['image', 'video', 'doc'] } }] });
            promises.push(message);
        });
        var messages = await Promise.all(promises);
        messages = this.filterMessage(messages).reverse(); //removes all the null messages
        if (messages.length < size) {
            callback(messages);
        } else {
            messages = messages.splice(messages.length - size);
            callback(messages);
        }
    }

    filterMessage(messages) {
        var index = -1;
        var arr_length = messages ? messages.length : 0;
        var resIndex = -1;
        var result = [];
        while (++index < arr_length) {
            var message = messages[index];
            if (message) {
                result[++resIndex] = message;
            }
        }
        return result;
    }
}

export default MessageService;