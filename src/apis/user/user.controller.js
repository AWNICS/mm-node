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
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       email:
 *         type: string
 *       password: 
 *         type: string
 *       phoneNo:
 *         type: string
 *       aadhaarNo:
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
 *       role:
 *         type: string
 *       socketId:
 *         type: string
 *       createdBy:
 *         type: string
 *       updatedBy:
 *         type: string
 */
/**
 * @swagger
 * /users:
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
 * /users/{id}:
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
 * /users:
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
 * /users/{id}:
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
 * @swagger
 * definitions:
 *   Staff:
 *     properties:
 *       id:
 *         type: integer
 *       userId:
 *         type: integer
 *       sex:
 *         type: string
 *       location:
 *         type: string
 *       department: 
 *         type: string
 *       staffId:
 *         type: integer
 *       address:
 *         type: string
 *       createdBy:
 *         type: string
 *       updatedBy:
 *         type: string
 */
/**
 * @swagger
 * /staffs/{id}:
 *   get:
 *     tags:
 *       - Staff
 *     description: Returns staff by id from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for staff to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Staff'
 *     responses:
 *       200:
 *         description: An staff return from MySql db
 */
router.get('/staffs/:id', (req, res) => {
    userService.getStaffInfoById(req.params.id, (staffInfo) => {
        res.send(staffInfo);
    });
});

/**
 * @swagger
 * /staffs:
 *   put:
 *     tags:
 *       - Staff
 *     description: Updates a single staff in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: staff data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Staff'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/staffs', (req, res) => {
    userService.updateStaffInfo(req.body, (updatedStaffInfo) => {
        res.send(updatedStaffInfo);
    });
});

/**
 * @swagger
 * definitions:
 *   Patient:
 *     properties:
 *       id:
 *         type: integer
 *       userId:
 *         type: integer
 *       sex:
 *         type: string
 *       weight:
 *         type: integer
 *       height:
 *         type: integer
 *       bloodGroup:
 *         type: string
 *       allergies:
 *         type: string
 *       location:
 *         type: string
 *       address:
 *         type: string
 *       createdBy:
 *         type: string
 *       updatedBy:
 *         type: string
 */
/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     tags:
 *       - Patient
 *     description: Returns patient by id from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for patient to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Patient'
 *     responses:
 *       200:
 *         description: An patient return from MySql db
 */
router.get('/patients/:id', (req, res) => {
    userService.getPatientInfoById(req.params.id, (patientInfo) => {
        res.send(patientInfo);
    });
});

/**
 * @swagger
 * /patients:
 *   put:
 *     tags:
 *       - Patient
 *     description: Updates a single patient in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: patient data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Patient'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/patients', (req, res) => {
    userService.updatePatientInfo(req.body, (updatedPatientInfo) => {
        res.send(updatedPatientInfo);
    });
});

module.exports = router;