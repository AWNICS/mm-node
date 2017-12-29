import SpecialitiesService from './specialities.service';
import express from 'express';
import log from '../../config/log4js.config';

var specialitiesService = new SpecialitiesService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Specialities:
 *     properties:
 *       id:
 *         type: string
 *         format: date
 *       name:
 *         type: string
 */
/**
 * @swagger
 * /specialities/controllers/createSpeciality:
 *   post:
 *     tags:
 *       - Specialities
 *     description: Creates a new speciality
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Specialities
 *         description: Speciality object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Specialities'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/controllers/createSpeciality', (req, res) => {
    specialitiesService.createSpeciality(req.body, (result) => {
        log.info('Speciality created : ' + JSON.stringify(result));
    });
    res.send('Speciality created successfully');
});

/**
 * @swagger
 * /specialities/controllers/readAllSpecialities:
 *   get:
 *     tags:
 *       - Specialities
 *     description: Returns all speciality
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Speciality
 *         schema:
 *           $ref: '#/definitions/Specialities'
 */
router.get('/controllers/readAllSpecialities', (req, res) => {
    specialitiesService.readAllSpecialities((results) => { res.json(results) });
});

/**
 * @swagger
 * /specialities/controllers/readSpecialityById/{id}:
 *   get:
 *     tags:
 *       - Specialities
 *     description: Returns Speciality by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for Speciality to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Specialities'
 *     responses:
 *       200:
 *         description: An Speciality return
 */
router.get('/controllers/readSpecialityById/:id', (req, res) => {
    specialitiesService.readSpecialityById(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('Read Speciality by ID successful');
});

/**
 * @swagger
 * /specialities/controllers/updateSpeciality:
 *   put:
 *     tags:
 *       - Specialities
 *     description: Updates a single speciality
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: speciality data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Specialities'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/controllers/updateSpeciality', (req, res) => {
    specialitiesService.updateSpeciality(req.body, (result) => { log.info('Speciality updated') });
    res.send('Speciality updated successfully');
});

/**
 * @swagger
 * /specialities/controllers/removeSpeciality/{id}:
 *   delete:
 *     tags:
 *       - Specialities
 *     description: Deletes a single speciality
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: speciality's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/controllers/removeSpeciality/:id', (req, res) => {
    specialitiesService.removeSpeciality(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('Speciality deleted');
});

module.exports = router;