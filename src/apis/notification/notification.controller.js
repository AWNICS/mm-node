import NotificationService from './notification.service';
import express from 'express';

var notificationService = new NotificationService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Notification:
 *     properties:
 *       id:
 *         type: integer
 *       userId:
 *         type: integer
 *       type:
 *         type: string
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       status:
 *         type: string
 *       channel:
 *         type: string
 *       priority:
 *         type: string
 *       template:
 *         type: text
 *       triggerTime:
 *         type: string
 *         format: date
 *       createdBy:
 *         type: integer
 *       updatedBy:
 *         type: integer    
 */
/**
 * @swagger
 * /notifications:
 *   post:
 *     tags:
 *       - Notification
 *     description: Creates a new notification in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Group object 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Notification'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/notifications', (req, res) => {
    notificationService.create(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /notifications:
 *   get:
 *     tags:
 *       - Notification
 *     description: Returns all notification from MySql
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of notification from MySql
 *         schema:
 *           $ref: '#/definitions/Notification'
 */
router.get('/notifications', (req, res) => {
    notificationService.readAll((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     tags:
 *       - Notification
 *     description: Returns notification by id from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for notification to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Notification'
 *     responses:
 *       200:
 *         description: A notification return from MySql
 */
router.get('/notifications/:id', (req, res) => {
    notificationService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /notifications:
 *   put:
 *     tags:
 *       - Notification
 *     description: Updates a single notification in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Notification data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Notification'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/notifications/:id', (req, res) => {
    notificationService.update(req.body, req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     tags:
 *       - Notification
 *     description: Deletes a single notification from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Notification's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/notifications/:id', (req, res) => {
    notificationService.remove(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     tags:
 *       - Notification
 *     description: Returns notifications by userId based on page and size from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: userId for notifications to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Notification'
 *     responses:
 *       200:
 *         description: A list of notifications return from MySql DB
 */
router.get('/notifications/users/:userId', (req, res) => {
    var userId = req.params.userId;
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    notificationService.readWebNotificationsByUserId(userId, page, size, (result) => {
        res.send(result);
    });
});

router.put('/notifications/users/:userId/clearall', (req, res) => {
    var userId = req.params.userId;
    notificationService.clearAllNotifications(userId, (result) => {
        res.send(result);
    });
});
module.exports = router;
