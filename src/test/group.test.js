import log from '../config/log4js.config';
import GroupService from '../apis/group/group.service';
import expect from 'expect.js';

var groupService = new GroupService();

describe('groupDao', function() {
    describe('#insert()', function() {
        xit('creates a group', function() {
            var group = {
                id: null,
                name: 'John',
                url: 'www.jhon.com',
                description: 'jhon doe',
                picture: 'jhon pic'
            };
            return groupService.create(group, (res) => {
                //log.info('value after insert: ' + JSON.stringify(res));
            }).then((result) => {
                expect(result.id).to.be.greaterThan(0);
                groupService.delete(result.id, (result) => {});
            });
        });
    });

    describe('#update()', function() {
        xit('group updated', function() {
            var group = {
                id: 4,
                name: 'dental care',
                url: 'www.dental.com',
                description: 'dental',
                picture: 'dental pic'
            };
            return groupService.update(group, (result) => {}).then((result) => {
                groupService.delete(result.id, (result) => {
                    log.info('updated is group is deleted');
                });
            })

        });
    });

    describe('#readAll()', function() {
        xit('Get all group', function() {
            return groupService.getAll((result) => {
                //log.info('all data from group: ' + JSON.stringify(result));
            });
        });
    });

    describe('#readById()', function() {
        xit('Get group by id', function() {
            return groupService.getById(1, () => {}).then((res) => {
                //log.info('get group by id data:' + JSON.stringify(res));
            });
        });
    });

    describe('#delete()', function() {
        xit('Group deleted', function() {
            return groupService.delete(2, () => {}).then((res) => {
                //log.info('deleted group');
            });
        });
    });
});