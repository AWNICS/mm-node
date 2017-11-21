var express = require('express');
var router = express.Router();

var user = require('./userDetails.dao');

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       phoneno:
 *         type: string
 *       picUrl:
 *         type: string
 *       briefDescription:
 *         type: object
 *         properties:
 *           description:
 *             type: string
 *       status:
 *         type: string
 *       waitingTime:
 *         type: integer
 *       rating:
 *         type: integer
 *       lastUpdatedTime:
 *         type: string
 */
/**
 * @swagger
 * /controllers/getUserDetails:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of user
 *         schema:
 *           $ref: '#/definitionss/User'
 */
router.get('/controllers/getUserDetails', user.getAllUserDetails);

/**
 * @swagger
 * /controllers/postUserDetails:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitionss/User'
 *     responses:
 *       200:
 *         description: Successfully created
 * 
 * 
 * 
 * 
 */
router.post('/controllers/postUserDetails', user.createUserDetails);

/**
 * @swagger
 * /controllers/putUserDetails/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitionss/User'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/controllers/putUserDetails/:id', user.updateUserDetails);

/**
 * @swagger
 * /controllers/removeUserDetails/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/controllers/removeUserDetails/:id', user.deleteUserDetails);

module.exports = router;