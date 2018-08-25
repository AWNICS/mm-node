import AuditService from './audit.service';
import express from 'express';
import log from '../../config/log4js.config';

var auditService = new AuditService();
var router = express.Router();

router.get('/audit', (req, res) => {
    auditService.readAll((results) => {
        res.send(results);
    });
});

router.get('/audit/:id', (req, res) => {
    auditService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

router.post('/audit', (req, res) => {
    auditService.create(req.body, (result) => {
        res.send(result);
    });
});

router.put('/audit/:id', (req, res) => {
    auditService.update(req.body, req.params.id, (result) => {
        res.send(result);
    });
});

router.delete('/audit/:id', (req, res) => {
    auditService.remove(req.params.id, (result) => {
        res.send(result);
    });
});

module.exports = router;