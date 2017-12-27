import log from '../config/log4js.config';
import UserService from '../apis/user/user.service';
var expect = require('expect.js');
var chai = require('chai');
var supertest = require("supertest");
let should = chai.should();
var server = supertest.agent("http://localhost:3000/userAPI");
var Sequelize = require('sequelize');

var userService = new UserService();

describe('userDao', function() {
    describe('#insert()', function() {
        it('creates a user', function(done) {
            var user = {
                id: null,
                name: 'abc',
                email: 'xyz@gmail.com',
                phoneNo: 8978567438,
                picUrl: 'nilu',
                description: 'SI',
                status: 'active',
                waitingTime: 10,
                rating: 7
            };
            return userService.register(user, (res) => {
                //log.info('value after insert: ' + JSON.stringify(res));
                //expect(res.id).to.be.greaterThan(0);
                //expect(result.name).to.equal(user.name);
                //userService.delete(res.id, (res) => {});
            }).then((result) => {
                //expect(result.id).to.be.greaterThan(0);
                log.info('user value after insert: ' + JSON.stringify(result));
                //userService.delete(result.id, (result) => {});
            });
            done();
        });
    });

    describe('#update()', function() {
        xit('user updated', function() {
            var user = {
                id: 24,
                name: 'nilu',
                email: 'nilu@gmail.com',
                phoneNo: 8978567438,
                picUrl: 'nilu',
                description: 'SI',
                status: 'active',
                waitingTime: 10,
                rating: 7
            };
            userService.updateRegisteredUser(user, (result) => {}).then((res, done) => {
                //userService.deleteRegisteredUser(user.id, (result) => {});
                done();
            });
        });
    });

    describe('#readAll()', function() {
        xit('Get all users', function() {
            userService.getAll((result) => {
                //log.info('all data: ' + JSON.stringify(result));
            }).then((result, done) => {
                done();
            });
        });
    });

    describe('#readById()', function() {
        xit('Get user by id', function() {
            userService.getById(22, () => {}).then((res, done) => {
                log.info('get by id data:' + JSON.stringify(res));
                done();
            });
        });
    });

    describe('#delete()', function() {
        xit('User deleted', function() {
            userService.deleteRegisteredUser(21, () => {}).then((res, done) => {
                log.info('deleted user');
                done();
            });
        });
    });
});

/*import log from '../config/log4js.config';
import UserService from '../apis/user/user.service';
var expect = require('expect.js');
var chai = require('chai');
var supertest = require("supertest");
let should = chai.should();
var server = supertest.agent("http://localhost:3000/userAPI");
var Sequelize = require('sequelize');

var userService = new UserService();

describe('userDao', function() {
    describe('#insert()', function() {
        it('creates a user', function() {
            var user = {
                name: 'xyz',
                email: 'xyz@gmail.com',
                phoneNo: 8978567438,
                picUrl: 'nilu',
                description: 'SI',
                status: 'active',
                waitingTime: 10,
                rating: 7
            };
            userService.register(user, (result) => {
                log.info('User data after insert: ' + JSON.stringify(result));
                expect(result.id).to.be.greaterThan(0);
                expect(result.name).to.equal(user.name);
                //userService.deleteRegisteredUser(result.id, (result) => {});
            });
        });
    });

    describe('#update()', function() {
        it('user updated', function() {
            var user = {
                id: 1,
                name: 'nisha',
                email: 'xyz@gmail.com',
                phoneNo: 8978567438
            };
            userService.updateRegisteredUser(user, (result) => {
                //userService.deleteRegisteredUser(user.id, (result) => {});
            });
        });
    });

    describe('#readAll()', function() {
        it('Get all users', function() {
            userService.getAll((result) => {});
        });
    });

    describe('#readById()', function() {
        it('Get user by id', function() {
            var user = {
                id: 1
            };
            userService.getById(user.id, (result) => {
                log.info('User data for ' + user.id + ' is ' + JSON.stringify(result));
            });
        });
    });

    describe('#delete()', function() {
        it('User deleted', function() {
            var user = {
                id: 3
            };
            userService.deleteRegisteredUser(user.id, (result) => {});
        });
    });
});*/