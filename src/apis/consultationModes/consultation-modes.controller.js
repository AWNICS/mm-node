import ConsultationModesService from './consultation-modes.service';
import express from 'express';

var consultationModesService = new ConsultationModesService();
var router = express.Router();

router.post('/consultationmodes', (req, res) => {
    consultationModesService.create(req.body, (result) => {
        res.send(result);
    });
});

router.get('/consultationmodes', (req, res) => {
    consultationModesService.readAll((results) => {
        res.send(results);
    });
});

router.get('/consultationmodes/:id', (req, res) => {
    consultationModesService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

router.put('/consultationmodes', (req, res) => {
    consultationModesService.update(req.body, (result) => {
        res.send(result);
    });
});

router.delete('/consultationmodes/:id', (req, res) => {
    consultationModesService.remove(req.params.id, () => {
        res.send({ message: "Consultation mode deleted successfully." });
    });
});

module.exports = router;
