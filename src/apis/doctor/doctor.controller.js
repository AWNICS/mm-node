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
 *         type: integer
 *       updatedBy:
 *         type: integer
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
 *         type: integer
 *       updatedBy:
 *         type: integer
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

/**
 * @swagger
 * definitions:
 *   DoctorSchedule:
 *     properties:
 *       id:
 *         type: integer
 *       doctorId:
 *         type: integer
 *       status:
 *         type: string
 *       activity: 
 *         type: string
 *       waitTime:
 *         type: integer
 *       slotId: 
 *         type: integer
 *       startTime:
 *         type: string
 *         format: date
 *       endTime:
 *         type: string
 *         format: date
 *       duration:
 *         type: integer
 *       createdBy:
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /doctors/schedules:
 *   post:
 *     tags:
 *       - DoctorSchedule
 *     description: Creates a new doctor schedule in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: doctor schedule object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/DoctorSchedule'
 *     responses:
 *       200:
 *         description: Successfully created doctor schedule in MySql db
 */
router.post('/doctors/schedules', function(req, res) {
    doctorService.createDoctorSchedule(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /doctors/schedules:
 *   get:
 *     tags:
 *       - DoctorSchedule
 *     description: Returns lists of doctors based on location, speciality, gps, currentTime, page, size
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lists of doctors return from MySql db
 */
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

//update status for doctor schedule 
router.put('/doctors/:doctorId/schedules/status', function(req, res) {
    var status = req.body;
    var doctorId = req.params.doctorId;
    doctorService.updateDoctorSchedule(status, doctorId, (result) => {
        res.send(result);
    });
});

router.get('/doctors/:doctorId/schedules', function(req, res) {
    var doctorId = req.params.doctorId;
    doctorService.getDoctorScheduleByDoctorId(doctorId, (result) => {
        res.send(result);
    });
});

/**doctorMedia */
router.post('/doctors/bio', function(req, res) {
    var doctorMedia = req.body;
    doctorService.createDoctorMedia(doctorMedia, (result) => {
        res.send(result);
    });
});

router.get('/doctors/bio', function(req, res) {
    doctorService.getAllDoctorMedias((result) => {
        res.json(result);
    });
});

router.get('/doctors/:doctorId/bio', function(req, res) {
    var doctorId = req.params.doctorId;
    doctorService.getMediaByDoctorId(doctorId, (result) => {
        res.send(result);
    });
});

router.get('/doctors/:doctorId/bio', function(req, res) {
    var doctorId = req.params.doctorId;
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    doctorService.getLimitedMediaByDoctorId(doctorId, page, size, (result) => {
        res.send(result);
    });
});

router.put('/doctors/:id/bio', function(req, res) {
    var doctorMedia = req.body;
    var id = req.params.id;
    doctorService.updateDoctorMedia(doctorMedia, id, (result) => {
        res.send(result);
    });
});

router.delete('/doctors/:id/bio', function(req, res) {
    var id = req.params.id;
    doctorService.deleteDoctorMedia(id, (result) => {
        res.sendStatus(200).send(result);
    });
});

/**doctorStore */
router.post('/doctors/bio/extra', function(req, res) {
    var doctorStore = req.body;
    doctorService.createDoctorStore(doctorStore, (result) => {
        res.send(result);
    });
});

router.get('/doctors/bio/extra', function(req, res) {
    doctorService.getAllDoctorStores((result) => {
        res.json(result);
    });
});

router.get('/doctors/:doctorId/bio/extra', function(req, res) {
    var doctorId = req.params.doctorId;
    doctorService.getDoctorStoreById(doctorId, (result) => {
        res.send(result);
    });
});

router.get('/doctors/:doctorId/bio', function(req, res) {
    var doctorId = req.params.doctorId;
    doctorService.getDoctorStoreById(doctorId, (result) => {
        res.send(result);
    });
});

router.put('/doctors/:id/bio/extra/:type', function(req, res) {
    var doctorStore = req.body;
    var id = req.params.id;
    var type = req.params.type;
    doctorService.updateDoctorStore(doctorStore, id, type, (result) => {
        res.send(result);
    });
});

router.delete('/doctors/:id/bio/extra', function(req, res) {
    var id = req.params.id;
    doctorService.deleteDoctorStore(id, (result) => {
        res.send('Number of doctor store deleted: ' + result);
    });
});

/**doctor activity */
router.post('/doctors/activities', function(req, res) {
    var doctorActivity = req.body;
    doctorService.createDoctorActivity(doctorActivity, (result) => {
        res.send(result);
    });
});

router.get('/doctors/activities', function(req, res) {
    doctorService.getAllDoctorActivities((result) => {
        res.send(result);
    });
});

router.get('/doctors/:doctorId/activities', function(req, res) {
    var doctorId = req.params.doctorId;
    doctorService.getByIdDoctorActivity(doctorId, (result) => {
        res.send(result);
    });
});

router.put('/doctors/:doctorId/activities/:id', function(req, res) {
    var doctorActivity = req.body;
    var id = req.params.id;
    var doctorId = req.params.doctorId;
    doctorService.updateDoctorActivity(doctorActivity, id, doctorId, (result) => {
        res.send(result);
    });
});

router.delete('/doctors/:doctorId/activities/:id', function(req, res) {
    var id = req.params.id;
    var doctorId = req.params.doctorId;
    doctorService.deleteDoctorActivity(id, (result) => {
        res.send('Number of doctor activity deleted: ' + result);
    });
});

/**doctor review */
router.post('/doctors/reviews', function(req, res) {
    var doctorReview = req.body;
    doctorService.createDoctorReview(doctorReview, (result) => {
        res.send(result);
    });
});

router.get('/doctors/reviews', function(req, res) {
    doctorService.getAllDoctorReviews((result) => {
        res.send(result);
    });
});

router.get('/doctors/:doctorId/reviews', function(req, res) {
    var doctorId = req.params.doctorId;
    doctorService.getByIdDoctorReview(doctorId, (result) => {
        res.send(result);
    });
});

router.put('/doctors/:doctorId/reviews/:id', function(req, res) {
    var doctorReview = req.body;
    var id = req.params.id;
    var doctorId = req.params.doctorId;
    doctorService.updateDoctorReview(doctorReview, id, doctorId, (result) => {
        res.send(result);
    });
});

router.delete('/doctors/:doctorId/reviews/:id', function(req, res) {
    var id = req.params.id;
    var doctorId = req.params.doctorId;
    doctorService.deleteDoctorReview(id, (result) => {
        res.send('Number of doctor review deleted: ' + result);
    });
});

router.get('/doctors/:doctorId/history', function(req, res) {
    var doctorId = req.params.doctorId;
    doctorService.getConsutationDetails(doctorId, (result) => {
        res.send(result);
    });
});

router.post('/doctors/:doctorId/files/pdf', function(req, res) {
    doctorService.generatePdf(req.body, (uploadedFileName) => {
        res.status(200).send(uploadedFileName);
    })
});

module.exports = router;