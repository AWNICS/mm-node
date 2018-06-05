import express from 'express';
import DoctorService from './doctor.service';
import log from '../../config/log4js.config';

var router = express.Router();
var doctorService = new DoctorService();

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
 *         type: string
 *       updatedBy:
 *         type: string
 *       termsAccepted:
 *         type: boolean
 */
/**
 * @swagger
 * /doctors:
 *   get:
 *     tags:
 *       - Doctor
 *     description: Returns all doctors from MySql db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of doctors from MySql db
 *         schema:
 *           $ref: '#/definitions/Doctor'
 */
router.get('/doctors', function(req, res) {
    doctorService.getAll((result) => {
        res.json(result);
    });
});

/**
 * @swagger
 * /doctors:
 *   put:
 *     tags:
 *       - Doctor
 *     description: Updates a single doctor in MySQL db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Doctor data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Doctor'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/doctors', function(req, res) {
    var doctor = req.body;
    doctorService.update(doctor, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     tags:
 *       - Doctor
 *     description: Deletes a  doctor from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Doctor's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql
 */
router.delete('/doctors/:id', function(req, res) {
    var id = req.params.id;
    doctorService.delete(id, (result) => {
        res.send('Number of doctor deleted: ' + result);
    });
});

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     tags:
 *       - Doctor
 *     description: Returns doctor by id from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for doctor to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Doctor'
 *     responses:
 *       200:
 *         description: An doctor return from MySql db
 */
router.get('/doctors/:id(\\d+)', function(req, res) {
    var id = req.params.id;
    doctorService.getById(id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * definitions:
 *   ConsultationSchedule:
 *     properties:
 *       id:
 *         type: integer
 *       patientId:
 *         type: integer
 *       doctorId:
 *         type: integer
 *       description:
 *         type: string
 *       createdBy:
 *         type: string
 *       updatedBy:
 *         type: string
 *       lastActive:
 *         type: string
 */
/**
 * @swagger
 * /consultations:
 *   post:
 *     tags:
 *       - Consultation
 *     description: Creates a new consultation in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: consultation object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ConsultationSchedule'
 *     responses:
 *       200:
 *         description: Successfully created consultation in MySql db
 */
router.post('/consultations', function(req, res) {
    var consultation = req.body;
    doctorService.createConsultation(consultation, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /consultations:
 *   get:
 *     tags:
 *       - Consultation
 *     description: Returns all consultations from MySql db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of consultations from MySql db
 *         schema:
 *           $ref: '#/definitions/ConsultationSchedule'
 */
router.get('/consultations', function(req, res) {
    doctorService.getAllConsultation((result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /consultations/{id}:
 *   get:
 *     tags:
 *       - Consultation
 *     description: Returns consultation by id from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for consultation to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/ConsultationSchedule'
 *     responses:
 *       200:
 *         description: An consultation return from MySql db
 */
router.get('/consultations/:id', function(req, res) {
    var id = req.params.id;
    doctorService.getByIdConsultation(id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /consultations:
 *   put:
 *     tags:
 *       - Consultation
 *     description: Updates a single consultation
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Consultation data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ConsultationSchedule'
 *     responses:
 *       200:
 *         description: Successfully updated data in MySql
 */
router.put('/consultations', function(req, res) {
    var consultation = req.body;
    doctorService.updateConsultation(consultation, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /consultations/{id}:
 *   delete:
 *     tags:
 *       - Consultation
 *     description: Deletes a single consultation from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Consultation's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/consultations/:id', function(req, res) {
    var id = req.params.id;
    doctorService.deleteConsultation(id, (result) => {
        res.send('Number of consultation deleted: ' + result);
    });
});

router.post('/doctors/schedules', function(req, res) {
    doctorService.createDoctorSchedule(req.body, (result) => {
        res.send(result);
    });
});

router.get('/doctors/schedules', function(req, res) {
    var location = req.query.location;
    var speciality = req.query.speciality;
    var gps = req.query.gps;
    var currentTime = req.query.current_time;
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    doctorService.getDoctorsLists(location, speciality, gps, currentTime, page, size, (result) => {
        res.send(result);
    });
});

module.exports = router;