import OrderRequestsService from './orderRequest.service';
import express from 'express';
import log from '../../config/log4js.config';

var orderRequestsService = new OrderRequestsService();
var router = express.Router();

router.post('/controllers/createOrderRequest', (req, res) => {
    orderRequestsService.createOrderRequest(req.body, (result) => {
        res.json(result);
    });
});

router.get('/controllers/readAllOrderRequests', (req, res) => {
    orderRequestsService.readAllOrderRequests((results) => {
        res.json(results);
    });
});

router.get('/controllers/readOrderRequestById/:id', (req, res) => {
    orderRequestsService.readOrderRequestById(req.params.id, (result) => {
        res.json(result);
    });
});

router.put('/controllers/updateOrderRequest', (req, res) => {
    orderRequestsService.updateOrderRequest(req.body, (result) => {
        res.json(result);
    });
});

router.delete('/controllers/removeOrderRequest/:id', (req, res) => {
    orderRequestsService.removeOrderRequest(req.params.id, (result) => {
        res.send('OrderRequest deleted');
    });
});

module.exports = router;