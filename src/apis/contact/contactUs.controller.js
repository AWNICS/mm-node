/**
 * controllers for contact api
 */

var express = require('express');
var router = express.Router();

var contact = require('./contactUs.dao');
//var email = require('./email.service');

/**
 * @swagger
 * definitions:
 *   Contact:
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
 *       termsAccepted:
 *         type: string
 */
/**
 * @swagger
 * /contact/controllers/getcontactUs:
 *   get:
 *     tags:
 *       - contactUs
 *     description: Returns all contact
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of contact
 *         schema:
 *           $ref: '#/definitions/Contact'
 */
router.get('/controllers/getContactUs', contact.getAllContacts);

/**
 * @swagger
 * /contact/controllers/postContactUs:
 *   post:
 *     tags:
 *       - contactUs
 *     description: Creates a new contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contactUs
 *         description: contactUs object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     responses:
 *       200:
 *         description: Successfully created
 * 
 * 
 * 
 * 
 */
router.post('/controllers/postContactUs', contact.createContact);

/**
 * @swagger
 * /contact/controllers/putContactUs/{id}:
 *   put:
 *     tags:
 *       - contactUs
 *     description: Updates a single contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: contactUs
 *         description: contactUs object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/controllers/putContactUs/:id', contact.updateContact);

/**
 * @swagger
 * /contact/controllers/removeContactUs/{id}:
 *   delete:
 *     tags:
 *       - contactUs
 *     description: Deletes a single contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/controllers/removeContactUs/:id', contact.deleteContact);
//contactRouter.post('controllers/sendMail', email.post);

router.get('/controllers/getContactById/:id', contact.getContact);

module.exports = router;