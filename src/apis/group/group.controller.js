import express from 'express';
import GroupService from './group.service';
import log from '../../config/log4js.config';

var router = express.Router();
var groupService = new GroupService();

/**
 * @swagger
 * definitions:
 *   Group:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       url:
 *         type: string
 *       description:
 *         type: string
 *       picture:
 *         type: string
 */
/**
 * @swagger
 * /group/controllers/createGroup:
 *   post:
 *     tags:
 *       - Group
 *     description: Creates a new group in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: group
 *         description: Group object 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/controllers/createGroup', function(req, res) {
    var group = req.body;
    groupService.create(group, (result) => {
        res.send('Group created: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /group/controllers/getGroups:
 *   get:
 *     tags:
 *       - Group
 *     description: Returns all group from MySql
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of group from MySql
 *         schema:
 *           $ref: '#/definitions/Group'
 */
router.get('/controllers/getGroups', function(req, res) {
    groupService.getAll((result) => {
        res.send('All group lists: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /group/controllers/getGroupById/{id}:
 *   get:
 *     tags:
 *       - Group
 *     description: Returns Group by id from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for Group to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: An Group return from MySql
 */
router.get('/controllers/getGroupById/:id', function(req, res) {
    var id = req.params.id;
    groupService.getById(id, (result) => {
        res.send('Read group by id: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /group/controllers/putGroup:
 *   put:
 *     tags:
 *       - Group
 *     description: Updates a single Group in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Group data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/controllers/putGroup', function(req, res) {
    var group = req.body;
    groupService.update(group, (result) => {
        res.send('Group updated' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /group/controllers/deleteGroup/{id}:
 *   delete:
 *     tags:
 *       - Group
 *     description: Deletes a single Group from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Group's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/controllers/deleteGroup/:id', function(req, res) {
    var id = req.params.id;
    groupService.delete(id, (result) => {
        res.send('Group deleted: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * definitions:
 *   GroupUserMap:
 *     properties:
 *       id:
 *         type: integer
 *       groupId:
 *         type: string
 *       userId:
 *         type: string
 *       createdBy:
 *         type: string
 *       updatedBy:
 *         type: string
 */
/**
 * @swagger
 * /group/controllers/createGroupUser:
 *   post:
 *     tags:
 *       - GroupUserMap
 *     description: Creates a new GroupUserMap in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: groupUserMap
 *         description: GroupUserMap object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/GroupUserMap'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/controllers/createGroupUser', function(req, res) {
    var groupUser = req.body;
    groupService.createGroupUser(groupUser, (result) => {
        res.send('Group created: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /group/controllers/getGroupUsers:
 *   get:
 *     tags:
 *       - GroupUserMap
 *     description: Returns all groupUserMap from MySql db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of groupUserMap from MySql db
 *         schema:
 *           $ref: '#/definitions/GroupUserMap'
 */
router.get('/controllers/getGroupUsers', function(req, res) {
    groupService.getAllGroupUser((result) => {
        res.send('All group user lists: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /group/controllers/getGroupUserById/{id}:
 *   get:
 *     tags:
 *       - GroupUserMap
 *     description: Returns groupUserMap by id from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for groupUserMap to return 
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/GroupUserMap'
 *     responses:
 *       200:
 *         description: An GroupUserMap return from MySql db
 */
router.get('/controllers/getGroupUserById/:id', function(req, res) {
    var id = req.params.id;
    groupService.getByIdGroupUser(id, (result) => {
        res.send('Read group user by id: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /group/controllers/putGroupUser:
 *   put:
 *     tags:
 *       - GroupUserMap
 *     description: Updates a single GroupUserMap in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: GroupUserMap data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/GroupUserMap'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/controllers/putGroupUser', function(req, res) {
    var groupUser = req.body;
    groupService.updateGroupUser(groupUser, (result) => {
        res.send('Group user updated' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /group/controllers/deleteGroupUser/{id}:
 *   delete:
 *     tags:
 *       - GroupUserMap
 *     description: Deletes a single GroupUserMap from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: GroupUserMap's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/controllers/deleteGroupUser/:id', function(req, res) {
    var id = req.params.id;
    groupService.deleteGroupUser(id, (result) => {
        res.send('Group user deleted: ' + JSON.stringify(result));
    });
});

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
 * /group/controllers/getAllGroupClones:
 *   get:
 *     tags:
 *       - GroupClones
 *     description: Returns all groupClones from Mongo db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of groupClones from Mongo db
 *         schema:
 *           $ref: '#/definitions/GroupClone'
 */
router.get('/controllers/getAllGroupClones', (req, res) => {
    groupService.readAllObj((results) => {
        res.send(results)
    });
});

/**
 * @swagger
 * /group/controllers/createGroupClone:
 *   post:
 *     tags:
 *       - GroupClones
 *     description: Creates a new Group in Mongo db
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
 *         description: Successfully created in Mongo db
 */
router.post('/controllers/createGroupClone', (req, res) => {
    groupService.createObj(req.body, (result) => { log.info('GroupClone created: ' + JSON.stringify(result)); });
    res.send('GroupClone created successfully');
});

/**
 * @swagger
 * /group/controllers/updateGroupClone:
 *   put:
 *     tags:
 *       - GroupClones
 *     description: Updates a single group in Mongo db
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
 *         description: Successfully updated in Mongo db
 */
router.put('/controllers/updateGroupClone', (req, res) => {
    groupService.updateObj(req.body, (result) => { log.info('Updated groupClone details'); });
    res.send('Updated groupClone');
});

/**
 * @swagger
 * /group/controllers/removeGroupClone/{id}:
 *   delete:
 *     tags:
 *       - GroupClones
 *     description: Deletes a groupClone from Mongo db
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
 *         description: Successfully deleted from Mongo db
 */
router.delete('/controllers/removeGroupClone/:id', (req, res) => {
    groupService.deleteObj(req.params.id, (result) => { log.info('Removed groupClone: ' + JSON.stringify(result)); });
    res.send('GroupClone deleted');
});

/**
 * @swagger
 * /groupClone/controllers/getGroupCloneById/{id}:
 *   get:
 *     tags:
 *       - GroupClones
 *     description: Returns groupClone by id from Mongo db
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
 *         description: An groupClone return from Mongo db
 */
router.get('/controllers/getGroupCloneById/:id', (req, res) => {
    groupService.readByIdObj(req.params.id, (result) => { log.info('GroupClone to be read is: ' + JSON.stringify(result)); });
    res.send('Fetched groupClone details using ID');
});

/**
 * @swagger
 * definitions:
 *   GroupUserMapClone:
 *     properties:
 *       id:
 *         type: string
 *         format: integer
 *       groupId:
 *         type: string
 *       userId:
 *         type: string
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
 * /group/controllers/getAllGroupUserMapClones:
 *   get:
 *     tags:
 *       - GroupUserMapClones
 *     description: Returns all groupUserMapClone from Mongo db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of groupUserMapClone from Mongo db
 *         schema:
 *           $ref: '#/definitions/GroupUserMapClone'
 */
router.get('/controllers/getAllGroupUserMapClones', (req, res) => {
    groupService.readAllGroupUserMapObj((results) => { log.info('Return groupUserMapClones: ' + JSON.stringify(results)); });
    res.send('Fetched all groupUserMapClones');
});

/**
 * @swagger
 * /group/controllers/createGroupUserMapClone:
 *   post:
 *     tags:
 *       - GroupUserMapClones
 *     description: Creates a new GroupUserMapClone in Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: groupUserMapClone
 *         description: GroupUserMapClone object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/GroupUserMapClone'
 *     responses:
 *       200:
 *         description: Successfully created in Mongo db
 */
router.post('/controllers/createGroupUserMapClone', (req, res) => {
    groupService.createGroupUserMapObj(req.body, (result) => { log.info('GroupUserMapClone created: ' + JSON.stringify(result)); });
    res.send('GroupUserMapClone created successfully');
});

/**
 * @swagger
 * /group/controllers/updateGroupUserMapClone:
 *   put:
 *     tags:
 *       - GroupUserMapClones
 *     description: Updates a single GroupUserMapClone in Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: GroupUserMapClone data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/GroupUserMapClone'
 *     responses:
 *       200:
 *         description: Successfully updated in Mongo db
 */
router.put('/controllers/updateGroupUserMapClone', (req, res) => {
    groupService.updateGroupUserMapObj(req.body, (result) => { log.info('Updated groupUserMapClone details'); });
    res.send('Updated groupUserMapClone');
});

/**
 * @swagger
 * /group/controllers/deleteGroupUserMapClone/{id}:
 *   delete:
 *     tags:
 *       - GroupUserMapClones
 *     description: Deletes a single groupUserMapClone from Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: GroupUserMapClone's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from Mongo db
 */
router.delete('/controllers/deleteGroupUserMapClone/:id', (req, res) => {
    groupService.deleteGroupUserMapObj(req.params.id, (result) => { log.info('Removed groupUserMapClone: ' + JSON.stringify(result)); });
    res.send('GroupUserMapClone deleted');
});

/**
 * @swagger
 * /group/controllers/getGroupUserMapCloneById/{id}:
 *   get:
 *     tags:
 *       - GroupUserMapClones
 *     description: Returns groupUserMapClone by id from Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for groupUserMapClone to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/GroupUserMapClone'
 *     responses:
 *       200:
 *         description: An groupUserMapClone return from Mongo db
 */
router.get('/controllers/getGroupUserMapCloneById/:id', (req, res) => {
    groupService.readByIdGroupUserMapObj(req.params.id, (result) => { log.info('GroupUserMapClone to be read is: ' + JSON.stringify(result)); });
    res.send('Fetched groupUserMapClone details using ID');
});

/**
 * for fetching all the groups for given user
 */
/*router.get('/controllers/getAllGroupClones/:userIds', (req, res) => {
    groupService.getAllGroupsBasedOnUserId((req.params.userIds), (result) => {
        log.info('GroupUserMapClone to be read is: ' + JSON.stringify(result));
    });
    res.send('Fetched groupUserMapClone details using ID');
});*/

module.exports = router;