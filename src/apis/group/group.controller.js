import express from 'express';
import GroupService from './group.service';
import log from '../../config/log4js.config';

var router = express.Router();
var groupService = new GroupService();

/**
 * apis for group 
 */
router.post('/controllers/createGroup', function(req, res) {
    var group = req.body;
    groupService.create(group, (result) => {
        res.send('Group created: ' + JSON.stringify(result));
    });
});

router.get('/controllers/getGroups', function(req, res) {
    groupService.getAll((result) => {
        res.send('All group lists: ' + JSON.stringify(result));
    });
});

router.get('/controllers/getGroupById/:id', function(req, res) {
    var id = req.params.id;
    groupService.getById(id, (result) => {
        res.send('Read group by id: ' + JSON.stringify(result));
    });
});

router.put('/controllers/putGroup', function(req, res) {
    var group = req.body;
    groupService.update(group, (result) => {
        res.send('Group updated' + JSON.stringify(result));
    });
});

router.delete('/controllers/deleteGroup/:id', function(req, res) {
    var id = req.params.id;
    groupService.delete(id, (result) => {
        res.send('Group deleted: ' + JSON.stringify(result));
    });
});

/**
 * apis for groupUserMap
 */
router.post('/controllers/createGroupUser', function(req, res) {
    var groupUser = req.body;
    groupService.createGroupUser(groupUser, (result) => {
        res.send('Group created: ' + JSON.stringify(result));
    });
});

router.get('/controllers/getGroupUsers', function(req, res) {
    groupService.getAllGroupUser((result) => {
        res.send('All group user lists: ' + JSON.stringify(result));
    });
});

router.get('/controllers/getGroupUserById/:id', function(req, res) {
    var id = req.params.id;
    groupService.getByIdGroupUser(id, (result) => {
        res.send('Read group user by id: ' + JSON.stringify(result));
    });
});

router.put('/controllers/putGroupUser', function(req, res) {
    var groupUser = req.body;
    groupService.updateGroupUser(groupUser, (result) => {
        res.send('Group user updated' + JSON.stringify(result));
    });
});

router.delete('/controllers/deleteGroupUser/:id', function(req, res) {
    var id = req.params.id;
    groupService.deleteGroupUser(id, (result) => {
        res.send('Group user deleted: ' + JSON.stringify(result));
    });
});

/**
 * for group clone
 */
router.get('/controllers/getAllGroupClones', (req, res) => {
    groupService.readAllObj((results) => { log.info('Return groupClones: ' + JSON.stringify(results)); });
    res.send('Fetched all groupClones');
});

router.post('/controllers/createGroupClone', (req, res) => {
    groupService.createObj(req.body, (result) => { log.info('GroupClone created: ' + JSON.stringify(result)); });
    res.send('GroupClone created successfully');
});

router.put('/controllers/updateGroupClone', (req, res) => {
    groupService.updateObj(req.body, (result) => { log.info('Updated groupClone details'); });
    res.send('Updated groupClone');
});

router.delete('/controllers/removeGroupClone/:id', (req, res) => {
    groupService.deleteObj(req.params.id, (result) => { log.info('Removed groupClone: ' + JSON.stringify(result)); });
    res.send('GroupClone deleted');
});

router.get('/controllers/getGroupCloneById/:id', (req, res) => {
    groupService.readByIdObj(req.params.id, (result) => { log.info('GroupClone to be read is: ' + JSON.stringify(result)); });
    res.send('Fetched groupClone details using ID');
});

/**
 * for groupUserMap clone
 */
router.get('/controllers/getAllGroupUserMapClones', (req, res) => {
    groupService.readAllGroupUserMapObj((results) => { log.info('Return groupUserMapClones: ' + JSON.stringify(results)); });
    res.send('Fetched all groupUserMapClones');
});

router.post('/controllers/createGroupUserMapClone', (req, res) => {
    groupService.createGroupUserMapObj(req.body, (result) => { log.info('GroupUserMapClone created: ' + JSON.stringify(result)); });
    res.send('GroupUserMapClone created successfully');
});

router.put('/controllers/updateGroupUserMapClone', (req, res) => {
    groupService.updateGroupUserMapObj(req.body, (result) => { log.info('Updated groupUserMapClone details'); });
    res.send('Updated groupUserMapClone');
});

router.delete('/controllers/deleteGroupUserMapClone/:id', (req, res) => {
    groupService.deleteGroupUserMapObj(req.params.id, (result) => { log.info('Removed groupUserMapClone: ' + JSON.stringify(result)); });
    res.send('GroupUserMapClone deleted');
});

router.get('/controllers/getGroupUserMapCloneById/:id', (req, res) => {
    groupService.readByIdGroupUserMapObj(req.params.id, (result) => { log.info('GroupUserMapClone to be read is: ' + JSON.stringify(result)); });
    res.send('Fetched groupUserMapClone details using ID');
});

module.exports = router;