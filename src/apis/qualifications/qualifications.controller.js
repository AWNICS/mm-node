import QualificationsService from './qualifications.service';
import express from 'express';

var qualificationsService = new QualificationsService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Qualification:
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
 * /qualifications:
 *   post:
 *     tags:
 *       - Qualification
 *     description: Creates a new qualification in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Qualification object 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Qualification'
 *     responses:
 *       200:
 *         description: Successfully created in MySql DB
 */
router.post('/qualifications', (req, res) => {
    qualificationsService.create(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /qualifications:
 *   get:
 *     tags:
 *       - Qualification
 *     description: Returns all qualification from MySql DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of qualification from MySql DB
 *         schema:
 *           $ref: '#/definitions/Qualification'
 */
router.get('/qualifications', (req, res) => {
    qualificationsService.readAll((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /qualifications/{id}:
 *   get:
 *     tags:
 *       - Qualification
 *     description: Returns qualification by id from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for qualification to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Qualification'
 *     responses:
 *       200:
 *         description: A qualification return from MySql DB
 */
router.get('/qualifications/:id', (req, res) => {
    qualificationsService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /qualifications:
 *   put:
 *     tags:
 *       - Qualification
 *     description: Updates a single qualification in MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Qualification data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Qualification'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql DB
 */
router.put('/qualifications', (req, res) => {
    qualificationsService.update(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /qualifications/{id}:
 *   delete:
 *     tags:
 *       - Qualification
 *     description: Deletes a single qualification from MySql DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Qualification's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql DB
 */
router.delete('/qualifications/:id', (req, res) => {
    qualificationsService.remove(req.params.id, (result) => {
        res.send({ message: "Qualification deleted successfully." });
    });
});

module.exports = router;