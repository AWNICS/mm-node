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
 *         type: integer
 *       user:
 *         type: string
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
 */
/**
 * @swagger
 * /message/controllers/getMessage:
 *   get:
 *     tags:
 *       - Messages
 *     description: Returns all messages
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of messages
 *         schema:
 *           $ref: '#/definitions/Message'
 */
router.get('/controllers/getMessage', (req, res) => {
    //var message = new Message();
    messageService.readAll((results) => { log.info('Messages are: ' + JSON.stringify(results)); });
    res.send('Fetched the messages successfully');
});

/**
 * @swagger
 * /message/controllers/postMessage:
 *   post:
 *     tags:
 *       - Messages
 *     description: Creates a new message
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
 *         description: Successfully created
 * 
 * 
 * 
 * 
 */
router.post('/controllers/sendMessage', (req, res) => {
    // call service and pass the control from service to DAO
    messageService.sendMessage(req.body, (result) => {
        log.info('The message sent is: ' + JSON.stringify(result));
    });
    res.send('Message sent successfully');
});

/**
 * @swagger
 * /message/controllers/putMessage/{id}:
 *   put:
 *     tags:
 *       - Messages
 *     description: Updates a single message
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: message
 *         description: Message object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Message'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/controllers/putMessage', (req, res) => {
    messageService.updateMessage(req.body, (result) => { log.info('Message updated') });
    res.send('Message updated successfully');
});

/**
 * @swagger
 * /message/controllers/removeMessage/{id}:
 *   delete:
 *     tags:
 *       - Messages
 *     description: Deletes a single message
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description:  messages
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/controllers/removeMessage/:id', (req, res) => {
    messageService.removeMessage(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('Message deleted');
});

router.get('/controllers/getMessageById/:id', (req, res) => {
    messageService.readMessageById(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('Read message by ID successful');
});

module.exports = router;