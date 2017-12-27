import SpecialitiesService from './specialities.service';
import express from 'express';
import log from '../../config/log4js.config';

var specialitiesService = new SpecialitiesService();
var router = express.Router();

router.post('/controllers/createSpeciality', (req, res) => {
    specialitiesService.createSpeciality(req.body, (result) => {
        log.info('Speciality created : ' + JSON.stringify(result));
    });
    res.send('Speciality created successfully');
});

router.get('/controllers/readAllSpecialities', (req, res) => {
    specialitiesService.readAllSpecialities((results) => { res.json(results) });
});

router.get('/controllers/readSpecialityById/:id', (req, res) => {
    specialitiesService.readSpecialityById(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('Read Speciality by ID successful');
});

router.put('/controllers/updateSpeciality', (req, res) => {
    specialitiesService.updateSpeciality(req.body, (result) => { log.info('Speciality updated') });
    res.send('Speciality updated successfully');
});

router.delete('/controllers/removeSpeciality/:id', (req, res) => {
    specialitiesService.removeSpeciality(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('Speciality deleted');
});

module.exports = router;