var express = require('express');
var router = express.Router();

var message = require('./message.dao');

/**
 * @swagger
 * definition:
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
 * /controllers/getMessage:
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
router.get('/controllers/getMessage', message.getAllMessages);

/**
 * @swagger
 * /controllers/postMessage:
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
router.post('/controllers/postMessage', message.createMessage);

/**
 * @swagger
 * /controllers/putMessage/{id}:
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
router.put('/controllers/putMessage/:id', message.updateMessage);

/**
 * @swagger
 * /controllers/removeMessage/{id}:
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
router.delete('/controllers/removeMessage/:id', message.deleteMessage);

module.exports = router;