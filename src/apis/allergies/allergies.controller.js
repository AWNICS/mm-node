import AllergiesService from './allergies.service';
import express from 'express';

var allergiesService = new AllergiesService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Allergies:
 *     properties:
 *       id:
 *         type: integer
 *       createdBy:
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /allergies:
 *   post:
 *     tags:
 *       - Allergies
 *     description: Creates a new allergies in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Allergies object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Allergies'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/allergies', (req, res) => {
    allergiesService.create(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /allergies:
 *   get:
 *     tags:
 *       - Allergies
 *     description: Returns all allergies from MySql db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of allergies from MySql db
 *         schema:
 *           $ref: '#/definitions/Allergies'
 */
router.get('/allergies', (req, res) => {
    allergiesService.readAll((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /allergies/{id}:
 *   get:
 *     tags:
 *       - Allergies
 *     description: Returns allergies by id from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for allergies to return 
 *         required: true
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/Allergies'
 *     responses:
 *       200:
 *         description: An Allergies return from MySql db
 */
router.get('/allergies/:id', (req, res) => {
    allergiesService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /allergies:
 *   put:
 *     tags:
 *       - Allergies
 *     description: Updates a single Allergies in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Allergies data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Allergies'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/allergies', (req, res) => {
    allergiesService.update(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /allergies/{id}:
 *   delete:
 *     tags:
 *       - Allergies
 *     description: Deletes a single Allergies from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Allergies's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/allergies/:id', (req, res) => {
    allergiesService.remove(req.params.id, () => {
        res.send({ message: "Allergy deleted successfully." });
    });
});

module.exports = router;