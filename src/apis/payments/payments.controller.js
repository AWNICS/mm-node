import express from 'express';
var router = express.Router();
import PaymentService from './payments.service';

var paymentService = new PaymentService();

router.post('/payments/requests', (req, res) => {
    paymentService.requestHandler(req, res);
});

router.post('/payments/responses', (req, res) => {
    paymentService.responseHandler(req, res);
});

module.exports = router;
