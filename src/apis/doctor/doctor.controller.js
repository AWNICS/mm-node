import express from 'express';
import DoctorService from './doctor.service';

var router = express.Router();
var doctorService = new DoctorService();

/**
 * @swagger
 * definitions:
 *   Doctor:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       picUrl:
 *         type: string
 *       regNo:
 *         type: string
 *       speciality:
 *         type: string
 *       experience:
 *         type: string
 *       Description:
 *         type: string
 *       email:
 *         type: string
 *       phoneNo:
 *         type: string
 *       status:
 *         type: string
 *       waitingTime:
 *         type: integer
 *       rating:
 *         type: integer
 *       videoUrl:
 *         type: string
 *       appearUrl:
 *         type: string
 *       thumbnailUrl:
 *         type: string
 *       lastUpdatedTime:
 *         type: string
 *         format: date
 *       termsAccepted:
 *         type: boolean
 */
/**
 * @swagger
 * /doctor/controllers/getDoctors:
 *   get:
 *     tags:
 *       - Doctors
 *     description: Returns all doctors
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of doctors
 *         schema:
 *           $ref: '#/definitions/Doctor'
 */
router.get('/controllers/getDoctors', function(req, res) {
    doctorService.getAll((result) => {
        res.send('All doctor lists: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /doctor/controllers/createDoctor:
 *   post:
 *     tags:
 *       - Doctors
 *     description: Creates a new doctor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: doctor
 *         description: Doctor object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Doctor'
 *     responses:
 *       200:
 *         description: Successfully created 
 */
router.post('/controllers/createDoctor', function(req, res) {
    var doctor = req.body;
    doctorService.create(doctor, (result) => {
        res.send('Doctor created: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /doctor/controllers/putDoctor:
 *   put:
 *     tags:
 *       - Doctors
 *     description: Updates a single doctor
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
 *         description: Successfully updated
 */
router.put('/controllers/putDoctor', function(req, res) {
    var doctor = req.body;
    doctorService.updateDoctor(doctor, (result) => {
        res.send('Doctor updated' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /doctor/controllers/deleteDoctor/{id}:
 *   delete:
 *     tags:
 *       - Doctors
 *     description: Deletes a single doctor
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
 *         description: Successfully deleted
 */
router.delete('/controllers/deleteDoctor/:id', function(req, res) {
    var id = req.params.id;
    doctorService.deleteDoctor(id, (result) => {
        res.send('Doctor deleted: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /doctor/controllers/getDoctorById/{id}:
 *   get:
 *     tags:
 *       - Doctors
 *     description: Returns user by id
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
 *         description: An doctor return
 */
router.get('/controllers/getDoctorById/:id', function(req, res) {
    var id = req.params.id;
    doctorService.getById(id, (result) => {
        res.send('Read doctor by id: ' + JSON.stringify(result));
    });
});

module.exports = router;