import express from 'express';
import UserDao from './user.dao';
import UserService from './user.service';
import log from '../../config/log4js.config';
//import activate from './activate';

var router = express.Router();
var userDao = new UserDao();
var userService = new UserService();

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       id:
 *         type: integer
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
 *       token:
 *         type: string
 *       activate:
 *         type: integer
 *       privilege:
 *         type: string
 */
/**
 * @swagger
 * /user/controllers/createdUser:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/controllers/createdUser', function(req, res) {
    var user = req.body;
    userService.register(user, (result) => {
        res.send('User created: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /user/controllers/getUser:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/controllers/getUser', function(req, res) {
    userService.getAll((result) => {
        res.send('All data: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /user/controllers/getUserById/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns user by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for user to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: An user return
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/controllers/getUserById/:id', function(req, res) {
    var id = req.params.id;
    userService.getById(id, (result) => {
        res.send('Read user by id: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /user/controllers/putUser:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/controllers/putUser', function(req, res) {
    var user = req.body;
    userService.updateRegisteredUser(user, (result) => {
        res.send('User updated' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /user/controllers/deleteUser/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/controllers/deleteUser/:id', function(req, res) {
    var id = req.params.id;
    userService.deleteRegisteredUser(id, (result) => {
        res.send('User deleted' + JSON.stringify(result));
    });
});

/**
 * updateActivate 
 */
router.get('/controllers/updateActivate/:token', function(req, res) {
    userService.activateUser(req.params.token, (result) => {
        res.sendFile('./activate.html', { root: __dirname })
    });
});

//for userClone
router.post('/controllers/createUserClone', (req, res) => {
    userService.createObj(req.body, (result) => {
        log.info('UserClone created : ' + JSON.stringify(result));
    });
    res.send('UserClone created successfully');
});

router.get('/controllers/readAllUserClones', (req, res) => {
    userService.readAllObj((results) => { log.info('All user clones are: ' + JSON.stringify(results)); });
    res.send('Fetched the userClones successfully');
});

router.get('/controllers/readUserCloneById/:id', (req, res) => {
    userService.readByIdObj(req.params.id, (result) => { log.info('User clone by id:' + JSON.stringify(result)); });
    res.send('Read useClone by ID successful');
});

router.put('/controllers/updateUserClone', (req, res) => {
    userService.updateObj(req.body, (result) => { log.info('UserClone updated') });
    res.send('UserClone updated successfully');
});

router.delete('/controllers/removeUserClone/:id', (req, res) => {
    userService.deleteObj(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('UserClone deleted');
});

module.exports = router;