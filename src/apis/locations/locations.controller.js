import LocationsService from './locations.service';
import express from 'express';
import log from '../../config/log4js.config';

var locationsService = new LocationsService();
var router = express.Router();

router.post('/locations', (req, res) => {
    locationsService.create(req.body, (result) => {
        res.send(result);
    });
});

router.get('/locations', (req, res) => {
    locationsService.readAll((results) => {
        res.send(results);
    });
});

router.get('/locations/:id', (req, res) => {
    locationsService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

router.put('/locations', (req, res) => {
    locationsService.update(req.body, (result) => {
        res.send(result);
    });
});

router.delete('/locations/:id', (req, res) => {
    locationsService.remove(req.params.id, (result) => {
        res.send(result);
    });
});

module.exports = router;