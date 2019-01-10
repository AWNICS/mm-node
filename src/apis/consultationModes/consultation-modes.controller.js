import ConsultationModesService from './consultation-modes.service';
import express from 'express';

var consultationModesService = new ConsultationModesService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   ConsultationModes:
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
 * /consultationmodes:
 *   post:
 *     tags:
 *       - ConsultationModes
 *     description: Creates a new consultationModes in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: consultationmodes object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ConsultationModes'
 *     responses:
 *       200:
 *         description: Successfully created consultationModes in MySql db
 */
router.post('/consultationmodes', (req, res) => {
    consultationModesService.create(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /consultationmodes:
 *   get:
 *     tags:
 *       - Consultationmodes
 *     description: Returns all consultationmodes from MySql db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of consultationmodes from MySql db.
 *         schema:
 *           $ref: '#/definitions/Consultationmodes'
 */
router.get('/consultationmodes', (req, res) => {
    consultationModesService.readAll((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /consultationmodes/{id}:
 *   get:
 *     tags:
 *       - Consultationmodes
 *     description: Returns consultationmodes by id from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for consultationmodes to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Billing'
 *     responses:
 *       200:
 *         description: An consultationmodes return from MySql db
 *         schema:
 *           $ref: '#/definitions/Consultationmodes'
 */
router.get('/consultationmodes/:id', (req, res) => {
    consultationModesService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /consultationmodes:
 *   put:
 *     tags:
 *       - Consultationmodes
 *     description: Updates a single consultationmodes
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Consultationmodes data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Billing'
 *     responses:
 *       200:
 *         description: Successfully updated data in MySql
 */
router.put('/consultationmodes', (req, res) => {
    consultationModesService.update(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /consultationmodes/{id}:
 *   delete:
 *     tags:
 *       - Consultationmodes
 *     description: Deletes a single consultationmodes from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Consultationmodes's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/consultationmodes/:id', (req, res) => {
    consultationModesService.remove(req.params.id, () => {
        res.send({ message: "Consultation mode deleted successfully." });
    });
});

module.exports = router;