import UserCloneService from './userClone.service';
import express from 'express';
import log from '../../config/log4js.config';

var userCloneService = new UserCloneService();
var router = express.Router();

router.post('/controllers/createUserClone', (req, res) => {
    userCloneService.createUserClone(req.body, (result) => {
        log.info('UserClone created : ' + JSON.stringify(result));
    });
    res.send('UserClone created successfully');
});

router.get('/controllers/readAllUserClones', (req, res) => {
    userCloneService.readAllUserClones((results) => { log.info('Messages are: ' + JSON.stringify(results)); });
    res.send('Fetched the userClones successfully');
});

router.get('/controllers/readUserCloneById/:id', (req, res) => {
    userCloneService.readUserCloneById(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('Read useClone by ID successful');
});

router.put('/controllers/updateUserClone', (req, res) => {
    userCloneService.updateUserClone(req.body, (result) => { log.info('UserClone updated') });
    res.send('UserClone updated successfully');
});

router.delete('/controllers/removeUserClone/:id', (req, res) => {
    userCloneService.removeUserClone(req.params.id, (result) => { log.info(JSON.stringify(result)); });
    res.send('UserClone deleted');
});

module.exports = router;