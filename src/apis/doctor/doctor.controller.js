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
 *       briefDescription:
 *         type: object
 *         properties:
 *           speciality:
 *             type: string
 *           experience:
 *             type: integer
 *           description:
 *             type: string
 *       contact:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           phoneno:
 *             type: string
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
 */
/**
 * @swagger
 * /doctor/controllers/getDoctorDetails:
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
        res.json(result);
    });
});

/**
 * @swagger
 * /doctor/controllers/postDoctorDetails:
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
 * /doctor/controllers/putDoctorDetails/{id}:
 *   put:
 *     tags:
 *       - Doctors
 *     description: Updates a single doctor
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Doctor's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: doctor
 *         description: Doctor object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Doctor'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/controllers/putDoctor', function(req, res) {
    var doctor = req.body;
    doctorService.update(doctor, (result) => {
        res.send('Doctor updated' + JSON.stringify(result));
    });
});

/**
 * @swagger
 * /doctor/controllers/removeDoctorDetails/{id}:
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
    doctorService.delete(id, (result) => {
        res.send('Doctor deleted: ' + JSON.stringify(result));
    });
});

//get doctor by id
router.get('/controllers/getDoctorById/:id', function(req, res) {
    var id = req.params.id;
    doctorService.getById(id, (result) => {
        res.send('Read doctor by id: ' + JSON.stringify(result));
    });
});

module.exports = router;