import BillingService from './billing.service';
import express from 'express';

var billingService = new BillingService();
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Billing:
 *     properties:
 *       id:
 *         type: integer
 *       requestedId:
 *         type: integer
 *       targetId:
 *         type: integer
 *       consultationId:
 *         type: integer
 *       status:
 *         type: string
 *       amount:
 *         type: text
 *       date:
 *         type: string
 *         format: date
 *       description:
 *         type: string
 *       referenceNumber:
 *         type: string
 *       modeOfPayment:
 *         type: string
 *       createdBy:
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /billing:
 *   post:
 *     tags:
 *       - Billing
 *     description: Creates a new billing in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: billing object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Billing'
 *     responses:
 *       200:
 *         description: Successfully created billing in MySql db
 */
router.post('/billing', (req, res) => {
    billingService.create(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /billing:
 *   get:
 *     tags:
 *       - Billing
 *     description: Returns all billing from MySql db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of billing from MySql db.
 *         schema:
 *           $ref: '#/definitions/Billing'
 */
router.get('/billing', (req, res) => {
    billingService.readAll((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /billing/{id}:
 *   get:
 *     tags:
 *       - Billing
 *     description: Returns billing by id from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for billing to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Billing'
 *     responses:
 *       200:
 *         description: An billing return from MySql db
 *         schema:
 *           $ref: '#/definitions/Billing'
 */
router.get('/billing/:id', (req, res) => {
    billingService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /billing:
 *   put:
 *     tags:
 *       - Billing
 *     description: Updates a single billing
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Billing data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Billing'
 *     responses:
 *       200:
 *         description: Successfully updated data in MySql
 */
router.put('/billing', (req, res) => {
    billingService.update(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /billing/{id}:
 *   delete:
 *     tags:
 *       - Billing
 *     description: Deletes a single billing from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Billing's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/billing/:id', (req, res) => {
    billingService.remove(req.params.id, () => {
        res.send({ message: "Billing deleted successfully." });
    });
});

/**
 * @swagger
 * /billing/visitors/{visitorId}:
 *   get:
 *     tags:
 *       - Billing
 *     description: Returns all bills by visitorId from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorId
 *         in: path
 *         description: visitorId for billing to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Billing'
 *     responses:
 *       200:
 *         description: Returns all bills by visitorId from MySql db
 *         schema:
 *           $ref: '#/definitions/Billing'
 */
router.get('/billing/visitors/:visitorId', (req, res) => {
    billingService.getAllBillingByVisitorId(req.params.visitorId, (billings) => {
        res.send(billings);
    });
});

router.get('/billing/doctors/:doctorId', (req, res) => {
    billingService.getAllBillingByDoctorId(req.params.doctorId, (billings) => {
        res.send(billings);
    });
});

/**
 * @swagger
 * definitions:
 *   ConsultationPrice:
 *     properties:
 *       id:
 *         type: integer
 *       doctorId:
 *         type: integer
 *       speciality:
 *         type: string
 *       price:
 *         type: float
 *       createdBy:
 *         type: integer
 *       updatedBy:
 *         type: integer
 */
/**
 * @swagger
 * /consultation/price:
 *   post:
 *     tags:
 *       - ConsultationPrice
 *     description: Creates a new consultationPrice in MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: ConsultationPrice object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ConsultationPrice'
 *     responses:
 *       200:
 *         description: Successfully created ConsultationPrice in MySql db
 */
router.post('/consultation/price', (req, res) => {
    billingService.createConsultationPrice(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /consultation/price:
 *   get:
 *     tags:
 *       - ConsultationPrice
 *     description: Returns all consultationPrice from MySql db
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of consultationPrice from MySql db.
 *         schema:
 *           $ref: '#/definitions/ConsultationPrice'
 */
router.get('/consultation/price', (req, res) => {
    billingService.readAllConsultationPrice((results) => {
        res.send(results);
    });
});

/**
 * @swagger
 * /consultation/{id}/price:
 *   get:
 *     tags:
 *       - ConsultationPrice
 *     description: Returns consultationPrice by id from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id for consultationPrice to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/ConsultationPrice'
 *     responses:
 *       200:
 *         description: An ConsultationPrice return from MySql db
 *         schema:
 *           $ref: '#/definitions/ConsultationPrice'
 */
router.get('/consultation/:id/price', (req, res) => {
    billingService.readByIdConsultationPrice(req.params.id, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /consultation/price:
 *   put:
 *     tags:
 *       - ConsultationPrice
 *     description: Updates a single consultationPrice
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: ConsultationPrice data that needs to be update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ConsultationPrice'
 *     responses:
 *       200:
 *         description: Successfully updated data in MySql
 */
router.put('/consultation/price', (req, res) => {
    billingService.updateConsultationPrice(req.body, (result) => {
        res.send(result);
    });
});

/**
 * @swagger
 * /consultation/{id}/price:
 *   delete:
 *     tags:
 *       - ConsultationPrice
 *     description: Deletes a single consultationPrice from MySql
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ConsultationPrice's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted from MySql db
 */
router.delete('/consultation/:id/price', (req, res) => {
    billingService.removeConsultationPrice(req.params.id, () => {
        res.send({ message: "consultationPrice deleted successfully." });
    });
});

/**
 * @swagger
 * /billing/visitors/{visitorId}/expenditures:
 *   get:
 *     tags:
 *       - Billing
 *     description: Returns expenditures by visitor from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorId
 *         in: path
 *         description: visitorId for appointments to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Billing'
 *     responses:
 *       200:
 *         description: Returns expenditures by visitor from MySql db
 *         schema:
 *           $ref: '#/definitions/Billing'
 */
router.get('/billing/visitors/:visitorId/expenditures', (req, res) => {
    billingService.moneySpentByVisitor(req.params.visitorId, (result) => {
        res.send({ "Spent:": result });
    });
});

/**
 * @swagger
 * /doctors/{doctorId}/duration:
 *   get:
 *     tags:
 *       - Billing
 *     description: Returns total duration for a doctor from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         description: doctorId for appointments to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Billing'
 *     responses:
 *       200:
 *         description: Returns total duration for a doctor from MySql db
 *         schema:
 *           $ref: '#/definitions/Billing'
 */
router.get('/doctors/:doctorId/duration', (req, res) => {
    billingService.durationForDoctor(req.params.doctorId, (result) => {
        res.send({ "Duration:": result });
    });
});

/**
 * @swagger
 * /doctors/{doctorId}/consutations:
 *   get:
 *     tags:
 *       - Billing
 *     description: Returns number of patients attended by a doctor from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         description: doctorId for appointments to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Billing'
 *     responses:
 *       200:
 *         description: Returns number of patients attended by a doctor from MySql db
 *         schema:
 *           $ref: '#/definitions/Billing'
 */
router.get('/doctors/:doctorId/consutations', (req, res) => {
    billingService.consultationsByDoctor(req.params.doctorId, (result) => {
        res.send({ "Number of patients attended": result });
    });
});

/**
 * @swagger
 * /visitors/{visitorId}/consutations:
 *   get:
 *     tags:
 *       - Billing
 *     description: Returns number of consultations attended by a patient from MySql db
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: visitorId
 *         in: path
 *         description: visitorId for appointments to return
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/Billing'
 *     responses:
 *       200:
 *         description: Returns number of consultations attended by a patient from MySql db
 *         schema:
 *           $ref: '#/definitions/Billing'
 */
router.get('/visitors/:visitorId/consutations', (req, res) => {
    billingService.consultationsOfVisitor(req.params.visitorId, (result) => {
        res.send({ "Consultations": result });
    });
});

module.exports = router;