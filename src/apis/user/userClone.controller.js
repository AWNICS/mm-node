import UserCloneService from './userClone.service';
import express from 'express';
import log from '../../config/log4js.config';

var userCloneService = new UserCloneService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   UserClone:
 *     properties:
 *       id:
 *         type: string
 *         format: date
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       phoneNo:
 *         type: integer
 *       picUrl:
 *         type: string
 *       description:
 *         type: string
 *       status:
 *         type: string
 *       waitingTime:
 *         type: integer
 *       rating:
 *         type: integer
 *       createdTime:
 *         type: string
 *         format: date
 *       createdBy:
 *         type: string
 *       updatedTime:
 *         type: string
 *         format: date
 *       updatedBy:
 *         type: string
 */
/**
 * @swagger
 * /userClone/controllers/createUserClone:
 *   post:
 *     tags:
 *       - UserClones
 *     description: Creates a new userClone
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: userClone object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserClone'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/controllers/createUserClone', (req, res) => {
    userCloneService.createUserClone(req.body, (result) => {
        log.info('UserClone created : ' + JSON.stringify(result));
    });
    res.send('UserClone created successfully');
});

/**
 * @swagger
 * /userClone/controllers/readAllUserClones:
 *   get:
 *     tags:
 *       - UserClones
 *     description: Returns all userClone
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of userClone
 *         schema:
 *           $ref: '#/definitions/UserClone'
 */
router.get('/controllers/readAllUserClones', (req, res) => {
    userCloneService.readAllUserClones((results) => { log.info('Messages are: ' + JSON.stringify(results)); });
    res.send('Fetched the userClones successfully');
});

/**
 * @swagger
 * /userClone/controllers/readUserCloneById/{id}:
 *   get:
 *     tags:
 *       - UserClones
 *     description: Returns userClone by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for userClone to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/UserClone'
 *     responses:
 *       200:
 *         description: An user return
 */
router.get('/controllers/readUserCloneById/:id', (req, res) => {
    userCloneService.readUserCloneById(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('Read useClone by ID successful');
});

/**
 * @swagger
 * /userClone/controllers/updateUserClone:
 *   put:
 *     tags:
 *       - UserClones
 *     description: Updates a single userClone
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: UserClone data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserClone'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/controllers/updateUserClone', (req, res) => {
    userCloneService.updateUserClone(req.body, (result) => { log.info('UserClone updated') });
    res.send('UserClone updated successfully');
});

/**
 * @swagger
 * /userClone/controllers/removeUserClone/{id}:
 *   delete:
 *     tags:
 *       - UserClones
 *     description: Deletes a userClone
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: UserClone's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/controllers/removeUserClone/:id', (req, res) => {
    userCloneService.removeUserClone(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('UserClone deleted');
});

module.exports = router;