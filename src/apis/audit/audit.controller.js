import AuditService from './audit.service';
import express from 'express';

var auditService = new AuditService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Audit:
 *     properties:
 *       senderId:
 *         type: integer
 *       receiverId:
 *         type: integer
 *       receiverType:
 *         type: string
 *       mode:
 *         type: string
 *       entityName:
 *         type: string
 *       entityEvent:
 *         type: string
 *       createdBy: 
 *         type: integer
 *       updatedBy: 
 *         type: integer
 *       createdTime: 
 *         type: string
 *         format: date
 *       updatedTime: 
 *         type: string
 *         format: date
 */
/**
 * @swagger
 * /audit:
 *   get:
 *     tags:
 *       - Audit
 *     description: Returns all audit from Mongo db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of audits from Mongo db
 *         schema:
 *           $ref: '#/definitions/Audit'
 */
router.get('/audit', (req, res) => {
    auditService.readAll((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /audit/{id}:
 *   get:
 *     tags:
 *       - Audit
 *     description: Returns audit by id from Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for audit to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Audit'
 *     responses:
 *       200:
 *         description: An audit return from Mongo db
 */
router.get('/audit/:id', (req, res) => {
    auditService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /audit:
 *   post:
 *     tags:
 *       - Audit
 *     description: Creates a new audit in Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Audit object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Audit'
 *     responses:
 *       200:
 *         description: Successfully created in Mongo db
 */
router.post('/audit', (req, res) => {
    auditService.create(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /audit/{id}:
 *   put:
 *     tags:
 *       - Audit
 *     description: Creating new audit by doctor/bot
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Audit object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Audit'
 *       - name: id
 *         in: path
 *         description: id for audit to return 
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Audit'
 *     responses:
 *       200:
 *         description: Successfully updated in mongo db
 */
router.put('/audit/:id', (req, res) => {
    auditService.update(req.body, req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /audit/{id}:
 *   delete:
 *     tags:
 *       - Audit
 *     description: Deletes audit from Mongo db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description:  id for deleting audit
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from Mongo db
 */
router.delete('/audit/:id', (req, res) => {
    auditService.remove(req.params.id, (result) => {
        res.send(result);
    });
});

module.exports = router;