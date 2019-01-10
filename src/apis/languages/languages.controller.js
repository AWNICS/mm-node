import LanguagesService from './languages.service';
import express from 'express';

var languagesService = new LanguagesService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Languages:
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
 * /languages:
 *   post:
 *     tags:
 *       - Languages
 *     description: Creates a new language in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Language object 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Languages'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/languages', (req, res) => {
    languagesService.create(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /languages:
 *   get:
 *     tags:
 *       - Languages
 *     description: Returns all language from MySql
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of languages from MySql
 *         schema:
 *           $ref: '#/definitions/Languages'
 */
router.get('/languages', (req, res) => {
    languagesService.readAll((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /languages/{id}:
 *   get:
 *     tags:
 *       - Group
 *     description: Returns language by id from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for language to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Languages'
 *     responses:
 *       200:
 *         description: A language return from MySql
 */
router.get('/languages/:id', (req, res) => {
    languagesService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /languages:
 *   put:
 *     tags:
 *       - Languages
 *     description: Updates a single language in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Language data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Languages'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/languages', (req, res) => {
    languagesService.update(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /languages/{id}:
 *   delete:
 *     tags:
 *       - Languages
 *     description: Deletes a single language from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Language's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/languages/:id', (req, res) => {
    languagesService.remove(req.params.id, () => {
        res.send({ message: "Language deleted successfully." });
    });
});

module.exports = router;