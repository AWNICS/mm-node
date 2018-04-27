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
 *       id:
 *         type: string
 *         format: date
 *       receiverId:
 *         type: string
 *       receiverType:
 *         type: string
 *       senderId:
 *         type: string
 *       picUrl:
 *         type: string
 *       text:
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
 */
/**
 * @swagger
 * /message/controllers/getMessage:
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
 * /message/controllers/sendMessage:
 *   post:
 *     tags:
 *       - Messages
 *     description: Creates a new message in Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: message
 *         description: Message object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Message'
 *     responses:
 *       200:
 *         description: Successfully created in Mongo db
 * 
 * 
 * 
 * 
 */
router.post('/messages', (req, res) => {
    // call service and pass the control from service to DAO
    messageService.sendMessage(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /message/controllers/putMessage:
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
 * /message/controllers/removeMessage/{id}:
 *   delete:
 *     tags:
 *       - Messages
 *     description: Deletes a single message from Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description:  messages
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
 * /message/controllers/getMessageById/{id}:
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
    messageService.readById(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('Read message by ID successful');
});

/**
 * get 100 messages on click of any group
 */
router.get('/messages/users/:userId/groups/:groupId', (req, res) => {
    messageService.getLimitedMessages((req.params.groupId), (req.params.userId), (req.query.page), (req.query.size), (results) => {
        res.send(results);
    });
});

/**
 * group_message_map
 */
router.get('/groupMessageMap', (req, res) => {
    messageService.readAllGroupMessageMap((results) => {
        res.send(results);
    });
});

router.get('/groupMessageMap/:id', (req, res) => {
    messageService.readGroupMessageMapById(req.params.id, (result) => {
        res.send(result);
    });
});

router.put('/groupMessageMap', (req, res) => {
    messageService.updateGroupMessageMap(req.body, (result) => {
        res.send(result);
    });
});

router.delete('/groupMessageMap/:id', (req, res) => {
    messageService.removeGroupMessageMap(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * for getting all media files
 */
router.get('/allMediaFiles', (req, res) => {
    messageService.allMediaFiles((files) => {
        res.send(files);
    });
});

router.get('/downloadMediaFile', (req, res) => {
    messageService.allMediaFiles((files) => {
        console.log('data: ' + files[0].contentData.data);
        res.download("1524632854339data-scientist.jpeg", 'me.jpg');
        //res.send(files);
    });
});

module.exports = router;