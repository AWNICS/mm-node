import express from 'express';
import DoctorService from '../doctor/doctor.service';
import UserService from '../user/user.service';
import log from '../../config/log4js.config';
import Properties from '../../util/properties';
import NotificationService from '../notification/notification.service';

const router = express.Router();
const doctorService = new DoctorService();
const userService = new UserService();
const notificationService = new NotificationService();

/**
 * @swagger
 * definitions:
 *   Doctor:
 *     properties:
 *       id:
 *         type: integer
 *       userId:
 *         type: integer
 *       regNo:
 *         type: string
 *       sex: 
 *         type: string
 *       location:
 *         type: string
 *       address: 
 *         type: string
 *       speciality:
 *         type: string
 *       experience:
 *         type: number
 *       description:
 *         type: string
 *       videoUrl:
 *         type: string
 *       appearUrl:
 *         type: string
 *       createdBy:
 *         type: integer
 *       updatedBy:
 *         type: integer
 *       termsAccepted:
 *         type: boolean
 */
/**
 * @swagger
 * /doctors:
 *   post:
 *     tags:
 *       - Doctor
 *     description: Creates a new doctor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Doctor object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Doctor'
 *     responses:
 *       200:
 *         description: Successfully created in MySql
 */
router.post('/doctors', function (req, res) {
    var doctor = req.body;
    doctorService.create(doctor, (result) => {
        res.send(result);
    });
});

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
 *         type: integer
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
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - User
 *     description: Creates a new user in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/users', function (req, res) {
    var user = req.body;
    userService.register(user, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /activates/{token}:
 *   get:
 *     tags:
 *       - User
 *     description: update activate column
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         description: token for user to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: An user activated in MySql db
 */
router.get('/activates/:token', function (req, res) {
    userService.activateUser(req.params.token, (result) => {
        res.sendFile('./activate.html', {
            root: __dirname
        });
    });
});

/**
 * @swagger
 * /resetPassword:
 *   post:
 *     tags:
 *       - User
 *     description: Forget password link 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.post('/resetPassword', function (req, res) {
    var email = req.body.email;
    userService.resetPasswordMail(email, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /resetPassword/{token}:
 *   get:
 *     tags:
 *       - User
 *     description: Token verification to redirect to angular reset password page
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         description: token for user 
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Token verified 
 */
router.get('/resetPassword/:token', function (req, res) {
    userService.verifyToken(req.params.token, (result) => {
        if (result === true) {
            res.redirect(`${Properties.redirectToClient}/${req.params.token}`);
        } else {
            res.send('Your link is expired. Try again');
        }
    });
});

/**
 * reset password 
 */
/**
 * @swagger
 * /resetPassword/{token}:
 *   put:
 *     tags:
 *       - User
 *     description: Password reset
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: password
 *         description: User data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *       - name: token
 *         in: path
 *         description: token for user 
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/resetPassword/:token', function (req, res) {
    var password = req.body.password;
    userService.resetPassword(password, req.params.token, (result) => {
        res.send(result);
    });
});

router.get('/send/otp/mobile/:mobileNo', (req, res) => {
    var mobileNo = req.params.mobileNo;
    var message = 'Your%20verfication%20code%20is:%20%23%23OTP%23%23';
    notificationService.sendOtp(message, mobileNo, (result) => {
        res.send(result);
    });
});

router.get('/resend/otp/mobile/:mobileNo', (req, res) => {
    var mobileNo = req.params.mobileNo;
    notificationService.resendOtp(mobileNo, (result) => {
        res.send(result);
    });
});

router.get('/verify/mobile/:mobileNo/otp/:otp', (req, res) => {
    var otp = req.params.otp;
    var mobileNo = req.params.mobileNo;
    notificationService.verfiyOtp(mobileNo, otp, (result) => {
        res.send(result);
    });
});

module.exports = router;