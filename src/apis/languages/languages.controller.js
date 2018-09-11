import LanguagesService from './languages.service';
import express from 'express';

var languagesService = new LanguagesService();
var router = express.Router();

router.post('/languages', (req, res) => {
    languagesService.create(req.body, (result) => {
        res.send(result);
    });
});

router.get('/languages', (req, res) => {
    languagesService.readAll((results) => {
        res.send(results);
    });
});

router.get('/languages/:id', (req, res) => {
    languagesService.readById(req.params.id, (result) => {
        res.send(result);
    });
});

router.put('/languages', (req, res) => {
    languagesService.update(req.body, (result) => {
        res.send(result);
    });
});

router.delete('/languages/:id', (req, res) => {
    languagesService.remove(req.params.id, () => {
        res.send({ message: "Language deleted successfully." });
    });
});

module.exports = router;
