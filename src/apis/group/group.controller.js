import express from 'express';
import GroupService from './group.service';

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
 *       userId:
 *         type: integer
 *       description:
 *         type: string
 *       picture:
 *         type: string
 *       createdBy:
 *         type: integer
 *       updatedBy:
 *         type: integer
 *       
 */
/**
 * @swagger
 * /groups:
 *   post:
 *     tags:
 *       - Group
 *     description: Creates a new group in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Group object 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/groups', function(req, res) {
    var group = req.body;
    groupService.create(group, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groups:
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
router.get('/groups', function(req, res) {
    groupService.getAll((result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     tags:
 *       - Group
 *     description: Returns group by id from MySql
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
 *         description: A group return from MySql
 */
router.get('/groups/:id', function(req, res) {
    var id = req.params.id;
    groupService.getById(id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groups:
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
router.put('/groups', function(req, res) {
    var group = req.body;
    groupService.update(group, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groups/{id}:
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
router.delete('/groups/:id', function(req, res) {
    var id = req.params.id;
    groupService.delete(id, (result) => {
        res.send('Number of groups deleted: ' + result);
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
 *         type: integer
 *       userId:
 *         type: integer
 *       createdBy:
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /groupUserMaps:
 *   post:
 *     tags:
 *       - GroupUserMap
 *     description: Creates a new GroupUserMap in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: GroupUserMap object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/GroupUserMap'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/groupUserMaps', function(req, res) {
    var groupUser = req.body;
    groupService.createGroupUserMap(groupUser, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groupUserMaps:
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
router.get('/groupUserMaps', function(req, res) {
    groupService.getAllGroupUserMaps((result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groupUserMaps/{id}:
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
router.get('/groupUserMaps/:id', function(req, res) {
    var id = req.params.id;
    groupService.getGroupUserMapById(id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groupUserMaps:
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
router.put('/groupUserMaps', function(req, res) {
    var groupUser = req.body;
    groupService.updateGroupUserMap(groupUser, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groupUserMaps/{id}:
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
router.delete('/groupUserMaps/:userId/:groupId', function(req, res) {
    var id = req.params.id;
    groupService.deleteGroupUserMap(req.params.userId, req.params.groupId, (result) => {
        res.send('Number of groupUserMap deleted: ' + result);
    });
});

/**
 * @swagger
 * /groups/users/{userId}:
 *   get:
 *     tags:
 *       - Group
 *     description: For fetching all the groups for given user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: userId for group to return 
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: Returns all the groups for the userId
 */
router.get('/groups/users/:userId', (req, res) => {
    groupService.getAllGroupsByUserId((req.params.userId))
        .then(result => res.send(result));
});

/**
 * @swagger
 * /groups/{receiverId}:
 *   post:
 *     tags:
 *       - Group
 *     description: Creating new group by doctor/bot
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Group object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Group'
 *       - name: receiverId
 *         in: path
 *         description: receiverId for group to return 
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/groups/:receiverId', function(req, res) {
    var group = req.body;
    var receiverId = req.params.receiverId;
    groupService.createGroupAuto(group, receiverId, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groups/{receiverId}/{doctorId}:
 *   post:
 *     tags:
 *       - Group
 *     description: Creating new group manually by doctor/bot
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Group object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Group'
 *       - name: receiverId
 *         in: path
 *         description: receiverId for group  
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Group'
 *       - name: doctorId
 *         in: path
 *         description: doctorId for group  
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/groups/:receiverId/:doctorId', function(req, res) {
    var group = req.body;
    var receiverId = req.params.receiverId;
    var doctorId = req.params.doctorId;
    groupService.createGroupManual(group, receiverId, doctorId, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /groups/doctors/:doctorId/patients/:patientId:
 *   get:
 *     tags:
 *       - Group
 *     description: For fetching consultation for the specified doctorId and patientId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         description: doctorId for group to return 
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Group'
 *       - name: patientId
 *         in: path
 *         description: patientId for group to return 
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: consultation for the specified doctorId and patientId
 */
router.get('/groups/doctors/:doctorId/patients/:patientId', function(req, res) {
    var doctorId = req.params.doctorId;
    var patientId = req.params.patientId;
    groupService.consultNow(doctorId, patientId, (result) => {
        res.send(result);
    });
});


/**
 * @swagger
 * /groups/:groupId/users:
 *   get:
 *     tags:
 *       - Group
 *     description: For fetching fullnames of users in group
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: groupId
 *         in: path
 *         description: id of the group
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Group'
 *     responses:
 *       200:
 *         description: list of users in the group
 */

router.get('/groups/:groupId/users', function(req, res) {
    var doctorId = req.params.groupId;
    groupService.getAllUsersByGroupId(doctorId, (result) => {
        res.send(result);
    });
});

module.exports = router;