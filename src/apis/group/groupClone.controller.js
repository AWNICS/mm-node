import express from 'express';
import GroupCloneService from './groupClone.service';
import log from '../../config/log4js.config';

var router = express.Router();
var groupCloneService = new GroupCloneService();

router.get('/controllers/getAllGroupClones', (req, res) => {
    groupCloneService.readAllGroupClones((results) => { log.info('Return groupClones: ' + JSON.stringify(results)); });
    res.send('Fetched all groupClones');
});
router.post('/controllers/createGroupClone', (req, res) => {
    groupCloneService.createGroupClone(req.body, (result) => { log.info('GroupClone created: ' + JSON.stringify(result)); });
    res.send('GroupClone created successfully');
});
router.put('/controllers/updateGroupClone', (req, res) => {
    groupCloneService.updateGroupClone(req.body, (result) => { log.info('Updated groupClone details'); });
    res.send('Updated groupClone');
});
router.delete('/controllers/removeGroupClone/:id', (req, res) => {
    groupCloneService.removeGroupClone(id, (result) => { log.info('Removed groupClone: ' + JSON.stringify(result)); });
    res.send('GroupClone deleted');
});
router.get('/controllers/getGroupCloneById/:id', (req, res) => {
    groupCloneService.readGroupCloneById(id, (result) => { log.info('GroupClone to be read is: ' + JSON.stringify(result)); });
    res.send('Fetched groupClone details using ID');
});

module.exports = router;