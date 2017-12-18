import express from 'express';
import GroupService from './group.service';
import log from '../../config/log4js.config';

var router = express.Router();
var groupService = new GroupService();

router.get('/controllers/getAllGroups', (req, res) => {
    groupService.readAllGroups((results) => { log.info('Return groups: ' + JSON.stringify(results)); });
    res.send('Fetched all groups');
});
router.post('/controllers/postGroup', (req, res) => {
    groupService.createGroup(req.body, (result) => { log.info('Group created: ' + JSON.stringify(result)); });
    res.send('Group created successfully');
});
router.put('/controllers/putGroup', (req, res) => {
    groupService.updateGroup(req.body, (result) => { log.info('Updated group details'); });
    res.send('Updated group');
});
router.delete('/controllers/removeGroup/:id', (req, res) => {
    groupService.removeGroup(id, (result) => { log.info('Removed group: ' + JSON.stringify(result)); });
    res.send('Group deleted');
});
router.get('/controllers/getGroupById/:id', (req, res) => {
    groupService.readGroupById(id, (result) => { log.info('Group to be read is: ' + JSON.stringify(result)); });
    res.send('Fetched group details using ID');
});

module.exports = router;