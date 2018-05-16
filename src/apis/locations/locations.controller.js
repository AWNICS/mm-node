import LocationsService from './locations.service';
import express from 'express';
import log from '../../config/log4js.config';

var locationsService = new LocationsService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Locations:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       latMin:
 *         type: integer
 *       lngMin:
 *         type: integer
 *       latMax:
 *         type: integer
 *       lngMax:
 *         type: integer
 *       createdBy:
 *         type: string
 *       updatedBy:
 *         type: string   
 */
/**
 * @swagger
 * /locations:
 *   post:
 *     tags:
 *       - Locations
 *     description: Creates a new location in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Location object 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Locations'
 *     responses:
 *       200:
 *         description: Successfully created in MySql db
 */
router.post('/locations', (req, res) => {
    locationsService.create(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /locations:
 *   get:
 *     tags:
 *       - Locations
 *     description: Returns all locations from MySql
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of locations from MySql
 *         schema:
 *           $ref: '#/definitions/Locations'
 */
router.get('/locations', (req, res) => {
    locationsService.readAll((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     tags:
 *       - Locations
 *     description: Returns location by id from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for location to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Locations'
 *     responses:
 *       200:
 *         description: A location return from MySql
 */
router.get('/locations/:id', (req, res) => {
    locationsService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /locations:
 *   put:
 *     tags:
 *       - Locations
 *     description: Updates a single location in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Location data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Locations'
 *     responses:
 *       200:
 *         description: Successfully updated in MySql db
 */
router.put('/locations', (req, res) => {
    locationsService.update(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     tags:
 *       - Locations
 *     description: Deletes a single location from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: location's id
 *         in: path
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Locations'
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/locations/:id', (req, res) => {
    locationsService.remove(req.params.id, (result) => {
        res.send(result);
    });
});

module.exports = router;