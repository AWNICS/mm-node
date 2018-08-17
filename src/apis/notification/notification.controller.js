import NotificationService from './notification.service';
import express from 'express';

var notificationService = new NotificationService();
var router = express.Router();

router.post('/notifications', (req, res) => {
    notificationService.create(req.body, (result) => {
        res.send(result);
    });
});

router.get('/notifications', (req, res) => {
    notificationService.readAll((results) => {
        res.send(results);
    });
});

router.get('/notifications/:id', (req, res) => {
    notificationService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

router.put('/notifications/:id', (req, res) => {
    notificationService.update(req.body, req.params.id, (result) => {
        res.send(result);
    });
});

router.delete('/notifications/:id', (req, res) => {
    notificationService.remove(req.params.id, (result) => {
        res.send(result);
    });
});

module.exports = router;