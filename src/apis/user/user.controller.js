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
 *       createdBy:
 *         type: string
 *       updatedBy:
 *         type: string
 */

/**
 * @swagger
 * /user/controllers/getUser:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all user from MySql db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of user from MySql db
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/users', function(req, res) {
    userService.getAll((result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /user/controllers/getUserById/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns user by id from MySql db
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
 *         description: An user return from MySql db
 */
router.get('/users/:id', function(req, res) {
    var id = req.params.id;
    userService.getById(id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /user/controllers/putUser:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a single user in MySql db
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
 *         description: Successfully updated in MySql db
 */
router.put('/users', function(req, res) {
    var user = req.body;
    userService.updateRegisteredUser(user, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /user/controllers/deleteUser/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a user from MySql db
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
 *         description: Successfully deleted from MySql db
 */
router.delete('/users/:id', function(req, res) {
    var id = req.params.id;
    userService.deleteRegisteredUser(id, (result) => {
        res.send('Number of user deleted: ' + result);
    });
});

/**
 * find user by name
 */
router.get('/users/:email', (req, res) => {
    userService.findUserByEmail(req.params.email, (result) => {
        if (result) {
            res.send(result);
        } else {
            res.status(401).send({ success: false, message: 'authentication failed' });
        }
    });
});

router.get('/staffs/:id', (req, res) => {
    userService.getStaffInfoById(req.params.id, (staffInfo) => {
        res.send(staffInfo);
    });
});

router.put('/staffs', (req, res) => {
    userService.updateStaffInfo(req.body, (updatedStaffInfo) => {
        res.send(updatedStaffInfo);
    });
});

router.get('/patients/:id', (req, res) => {
    userService.getPatientInfoById(req.params.id, (patientInfo) => {
        res.send(patientInfo);
    });
});

router.put('/patients', (req, res) => {
    userService.updatePatientInfo(req.body, (updatedPatientInfo) => {
        res.send(updatedPatientInfo);
    });
});

module.exports = router;