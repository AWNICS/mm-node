import BillingService from './billing.service';
import express from 'express';

var billingService = new BillingService();
var router = express.Router();

router.post('/billing', (req, res) => {
    billingService.create(req.body, (result) => {
        res.send(result);
    });
});

router.get('/billing', (req, res) => {
    billingService.readAll((results) => {
        res.send(results);
    });
});

router.get('/billing/:id', (req, res) => {
    billingService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

router.put('/billing', (req, res) => {
    billingService.update(req.body, (result) => {
        res.send(result);
    });
});

router.delete('/billing/:id', (req, res) => {
    billingService.remove(req.params.id, () => {
        res.send({ message: "billing deleted successfully." });
    });
});

//for consultation price related APIs
router.post('/consultationPrice', (req, res) => {
    billingService.createConsultationPrice(req.body, (result) => {
        res.send(result);
    });
});

router.get('/consultationPrice', (req, res) => {
    billingService.readAllConsultationPrice((results) => {
        res.send(results);
    });
});

router.get('/consultationPrice/:id', (req, res) => {
    billingService.readByIdConsultationPrice(req.params.id, (result) => {
        res.send(result);
    });
});

router.put('/consultationPrice', (req, res) => {
    billingService.updateConsultationPrice(req.body, (result) => {
        res.send(result);
    });
});

router.delete('/consultationPrice/:id', (req, res) => {
    billingService.removeConsultationPrice(req.params.id, () => {
        res.send({ message: "consultationPrice deleted successfully." });
    });
});

//for patient expenditures
router.get('/billing/visitors/:visitorId/expenditures', (req, res) => {
    billingService.moneySpentByVisitor(req.params.visitorId, (result) => {
        res.send({ "Spent:": result });
    });
});

//money earned by doctor
router.get('/billing/doctors/:doctorId/earning', (req, res) => {
    billingService.moneyEarnedByDoctor(req.params.doctorId, (result) => {
        res.send({ "Earned:": result });
    });
});

//total duration for a doctor
router.get('/doctors/:doctorId/duration', (req, res) => {
    billingService.durationForDoctor(req.params.doctorId, (result) => {
        res.send({ "Duration:": result });
    });
});

//number of patients attended by a doctor
router.get('/doctors/:doctorId/consutations', (req, res) => {
    billingService.consultationsByDoctor(req.params.doctorId, (result) => {
        res.send({ "Number of patients attended": result });
    });
});

//number of consultations attended by a patient
router.get('/visitors/:visitorId/consutations', (req, res) => {
    billingService.consultationsOfVisitor(req.params.visitorId, (result) => {
        res.send({ "Consultations": result });
    });
});

module.exports = router;