var express = require('express');
var router = express.Router();

var doctor = require('./doctorDetails.dao');

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
router.get('/controllers/getDoctorDetails', doctor.getAllDoctorDetails);

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
 * 
 * 
 * 
 * 
 */
router.post('/controllers/postDoctorDetails', doctor.createDoctorDetails);

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
router.put('/controllers/putDoctorDetails/:id', doctor.updateDoctorDetails);

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
router.delete('/controllers/removeDoctorDetails/:id', doctor.deleteDoctorDetails);

router.get('/controllers/getDoctorDetailsById/:id', doctor.getDoctorDetail);

module.exports = router;