import express from 'express';
import GroupCloneService from './groupClone.service';
import log from '../../config/log4js.config';

var router = express.Router();
var groupCloneService = new GroupCloneService();

/**
 * @swagger
 * definitions:
 *   GroupClone:
 *     properties:
 *       id:
 *         type: string
 *         format: date
 *       userIds:
 *         type: array
 *         items:
 *           type: string
 *       createdBy:
 *         type: string
 *       updatedBy:
 *         type: string
 *       createdTime:
 *         type: string
 *         format: date
 *       updatedTime:
 *         type: string
 *         format: date
 */
/**
 * @swagger
 * /groupClone/controllers/getAllGroupClones:
 *   get:
 *     tags:
 *       - GroupClones
 *     description: Returns all groups
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of groups
 *         schema:
 *           $ref: '#/definitions/GroupClone'
 */
router.get('/controllers/getAllGroupClones', (req, res) => {
    groupCloneService.readAllGroupClones((results) => { log.info('Return groupClones: ' + JSON.stringify(results)); });
    res.send('Fetched all groupClones');
});

/**
 * @swagger
 * /groupClone/controllers/createGroupClone:
 *   post:
 *     tags:
 *       - GroupClones
 *     description: Creates a new Group
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: GroupClone
 *         description: group object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/GroupClone'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/controllers/createGroupClone', (req, res) => {
    groupCloneService.createGroupClone(req.body, (result) => { log.info('GroupClone created: ' + JSON.stringify(result)); });
    res.send('GroupClone created successfully');
});

/**
 * @swagger
 * /groupClone/controllers/updateGroupClone:
 *   put:
 *     tags:
 *       - GroupClones
 *     description: Updates a single group
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: GroupClone data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/GroupClone'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

router.put('/controllers/updateGroupClone', (req, res) => {
    groupCloneService.updateGroupClone(req.body, (result) => { log.info('Updated groupClone details'); });
    res.send('Updated groupClone');
});

/**
 * @swagger
 * /groupClone/controllers/removeGroupClone/{id}:
 *   delete:
 *     tags:
 *       - GroupClones
 *     description: Deletes a groupClone
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: GroupClone's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

router.delete('/controllers/removeGroupClone/:id', (req, res) => {
    groupCloneService.removeGroupClone(req.params.id, (result) => { log.info('Removed groupClone: ' + JSON.stringify(result)); });
    res.send('GroupClone deleted');
});

/**
 * @swagger
 * /groupClone/controllers/getGroupCloneById/{id}:
 *   get:
 *     tags:
 *       - GroupClones
 *     description: Returns groupClone by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for groupClone to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/GroupClone'
 *     responses:
 *       200:
 *         description: An groupClone return
 */

router.get('/controllers/getGroupCloneById/:id', (req, res) => {
    groupCloneService.readGroupCloneById(req.params.id, (result) => { log.info('GroupClone to be read is: ' + JSON.stringify(result)); });
    res.send('Fetched groupClone details using ID');
});

module.exports = router;