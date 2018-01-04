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
router.get('/controllers/getDoctors', function(req, res) {
    doctorService.getAll((result) => {
        res.json(result);
    });
});

/**
 * @swagger
 * /doctor/controllers/createDoctor:
 *   post:
 *     tags:
 *       - Doctor
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
 *         description: Successfully created in MySql
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
router.put('/controllers/putDoctor', function(req, res) {
    var doctor = req.body;
    doctorService.update(doctor, (result) => {
        res.send('Doctor updated' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /doctor/controllers/deleteDoctor/{id}:
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
router.delete('/controllers/deleteDoctor/:id', function(req, res) {
    var id = req.params.id;
    doctorService.delete(id, (result) => {
        res.send('Doctor deleted: ' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /doctor/controllers/getDoctorById/{id}:
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
router.get('/controllers/getDoctorById/:id', function(req, res) {
    var id = req.params.id;
    doctorService.getById(id, (result) => {
        res.send('Read doctor by id: ' + JSON.stringify(result));
    });
});

module.exports = router;