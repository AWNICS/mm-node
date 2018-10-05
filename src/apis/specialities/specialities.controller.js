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
 *         type: integer
 *       name:
 *         type: string
 *       createdBy: 
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /specialities:
 *   post:
 *     tags:
 *       - Specialities
 *     description: Creates a new speciality in MySql db
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
 *         description: Successfully created in MySql db
 */
router.post('/specialities', (req, res) => {
    specialitiesService.create(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /specialities:
 *   get:
 *     tags:
 *       - Specialities
 *     description: Returns all speciality from MySql db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Speciality from MySql db
 *         schema:
 *           $ref: '#/definitions/Specialities'
 */
router.get('/specialities', (req, res) => {
    specialitiesService.readAll((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /specialities/{id}:
 *   get:
 *     tags:
 *       - Specialities
 *     description: Returns Speciality by id from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for Speciality to return
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Specialities'
 *     responses:
 *       200:
 *         description: An Speciality return from MySql db
 */
router.get('/specialities/:id', (req, res) => {
    specialitiesService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /specialities:
 *   put:
 *     tags:
 *       - Specialities
 *     description: Updates a single speciality in MySql db
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
 *         description: Successfully updated in MySql db
 */
router.put('/specialities', (req, res) => {
    specialitiesService.update(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /specialities/{id}:
 *   delete:
 *     tags:
 *       - Specialities
 *     description: Deletes a single speciality in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: speciality's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql
 */
router.delete('/specialities/:id', (req, res) => {
    specialitiesService.remove(req.params.id, (result) => {
        res.send(result);
    });
});

module.exports = router;