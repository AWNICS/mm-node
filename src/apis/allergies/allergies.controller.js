import AllergiesService from './allergies.service';
import express from 'express';

var allergiesService = new AllergiesService();
var router = express.Router();

router.post('/allergies', (req, res) => {
    allergiesService.create(req.body, (result) => {
        res.send(result);
    });
});

router.get('/allergies', (req, res) => {
    allergiesService.readAll((results) => {
        res.send(results);
    });
});

router.get('/allergies/:id', (req, res) => {
    allergiesService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

router.put('/allergies', (req, res) => {
    allergiesService.update(req.body, (result) => {
        res.send(result);
    });
});

router.delete('/allergies/:id', (req, res) => {
    allergiesService.remove(req.params.id, () => {
        res.send({ message: "Allergy deleted successfully." });
    });
});

module.exports = router;
