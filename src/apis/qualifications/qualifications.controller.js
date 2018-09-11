import QualificationsService from './qualifications.service';
import express from 'express';

var qualificationsService = new QualificationsService();
var router = express.Router();

router.post('/qualifications', (req, res) => {
    qualificationsService.create(req.body, (result) => {
        res.send(result);
    });
});

router.get('/qualifications', (req, res) => {
    qualificationsService.readAll((results) => {
        res.send(results);
    });
});

router.get('/qualifications/:id', (req, res) => {
    qualificationsService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

router.put('/qualifications', (req, res) => {
    qualificationsService.update(req.body, (result) => {
        res.send(result);
    });
});

router.delete('/qualifications/:id', (req, res) => {
    qualificationsService.remove(req.params.id, (result) => {
        res.send({ message: "Qualification deleted successfully." });
    });
});

module.exports = router;
