import MessageService from './message.service';
import express from 'express';
import log from '../../config/log4js.config';

var messageService = new MessageService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Message:
 *     properties:
 *       receiverId:
 *         type: integer
 *       receiverType:
 *         type: string
 *       senderId:
 *         type: integer
 *       picUrl:
 *         type: string
 *       text:
 *         type: string
 *       type:
 *         type: string
 *       status:
 *         type: string
 *       contentType:
 *         type: string
 *       contentData:
 *         type: object
 *         properties:
 *           data:
 *             type: array
 *             items:
 *               type: string
 *       responseData:
 *         type: object
 *         properties:
 *           data:
 *             type: array
 *             items:
 *               type: string
 *       lastUpdateTime: 
 *         type: string
 *         format: date
 *       createdBy: 
 *         type: integer
 *       updatedBy: 
 *         type: integer
 *       createdTime: 
 *         type: string
 *         format: date
 *       updatedTime: 
 *         type: string
 *         format: date
 */
/**
 * @swagger
 * /messages:
 *   get:
 *     tags:
 *       - Messages
 *     description: Returns all messages from Mongo db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of messages from Mongo db
 *         schema:
 *           $ref: '#/definitions/Message'
 */
router.get('/messages', (req, res) => {
    messageService.readAll((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /messages:
 *   post:
 *     tags:
 *       - Messages
 *     description: Creates a new message in Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Message object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Message'
 *     responses:
 *       200:
 *         description: Successfully created in Mongo db
 */
router.post('/messages', (req, res) => {
    // call service and pass the control from service to DAO
    messageService.sendMessage(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /messages:
 *   put:
 *     tags:
 *       - Messages
 *     description: Updates a single message in Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Message data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Message'
 *     responses:
 *       200:
 *         description: Successfully updated in Mongo db
 */
router.put('/messages', (req, res) => {
    messageService.update(req.body, (result) => { log.info('Message updated') });
    res.send('Message updated successfully');
});

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     tags:
 *       - Messages
 *     description: Deletes a single message from Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: messages
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from Mongo db
 */
router.delete('/messages/:id', (req, res) => {
    messageService.remove(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     tags:
 *       - Messages
 *     description: Returns message by id from Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for message to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Message'
 *     responses:
 *       200:
 *         description: An message return from Mongo db
 */
router.get('/messages/:id', (req, res) => {
    messageService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /messages/users/{userId}/groups/{groupId}:
 *   get:
 *     tags:
 *       - Messages
 *     description: Get 100 messages on click of any group
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: userId for message to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Message'
 *       - name: groupId
 *         in: path
 *         description: groupId for message to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Message'
 *     responses:
 *       200:
 *         description: 100 messages return from Mongo db
 */
router.get('/messages/users/:userId/groups/:groupId', (req, res) => {
    messageService.getLimitedMessages((req.params.groupId), (req.params.userId), (req.query.page), (req.query.size), (results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * definitions:
 *   GroupMessageMap:
 *     properties:
 *       messageId:
 *         type: string
 *       groupId:
 *         type: integer
 *       userSId:
 *         type: integer
 *       createdBy: 
 *         type: integer
 *       updatedBy: 
 *         type: integer
 *       createdTime: 
 *         type: string
 *         format: date
 *       updatedTime: 
 *         type: string
 *         format: date
 */
/**
 * @swagger
 * /groupMessageMap:
 *   get:
 *     tags:
 *       - GroupMessageMap
 *     description: Returns all group message maps from Mongo db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of group message maps from Mongo db
 *         schema:
 *           $ref: '#/definitions/GroupMessageMap'
 */
router.get('/groupMessageMap', (req, res) => {
    messageService.readAllGroupMessageMap((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /groupMessageMap/{id}:
 *   get:
 *     tags:
 *       - GroupMessageMap
 *     description: Returns group message map by id from Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for group message map to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/GroupMessageMap'
 *     responses:
 *       200:
 *         description: An group message map return from Mongo db
 */
router.get('/groupMessageMap/:id', (req, res) => {
    messageService.readGroupMessageMapById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groupMessageMap:
 *   put:
 *     tags:
 *       - GroupMessageMap
 *     description: Updates group message map in Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: group message map data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/GroupMessageMap'
 *     responses:
 *       200:
 *         description: Successfully updated in Mongo db
 */
router.put('/groupMessageMap', (req, res) => {
    messageService.updateGroupMessageMap(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groupMessageMap/{id}:
 *   delete:
 *     tags:
 *       - GroupMessageMap
 *     description: Deletes group message map from Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description:  id for deleting group message map
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from Mongo db
 */
router.delete('/groupMessageMap/:id', (req, res) => {
    messageService.removeGroupMessageMap(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /messages/media/groups/{groupId}:
 *   get:
 *     tags:
 *       - Messages
 *     description: For getting all media files
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: groupId for message to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Message'
 *     responses:
 *       200:
 *         description: Return all media messages for this groupId
 */
router.get('/messages/media/groups/:id', (req, res) => {
    messageService.media(parseInt(req.params.id), parseInt(req.query.page), parseInt(req.query.size), (messages) => {
        res.send(messages);
    });
});

module.exports = router;