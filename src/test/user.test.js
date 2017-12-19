import log from '../config/log4js.config';
import UserDao from '../apis/user/user.dao';
var expect = require('expect.js');
var chai = require('chai');
var supertest = require("supertest");
let should = chai.should();
var server = supertest.agent("http://localhost:3000/userAPI");
var user = {
    id: null,
    name: 'nilu',
    email: 'xyz@gmail.com',
    phoneNo: 8978567438,
    picUrl: 'nilu',
    description: 'SI',
    status: 'active',
    waitingTime: 10,
    rating: 7
};
var userDao = new UserDao();

describe('userDao', function() {
    describe('#insert()', function() {
        it('creates a user', function() {
            userDao.insert(user, (result) => {
                expect(result.id).to.be.greaterThan(0);
                expect(result.name).to.equal(user.name);
                userDao.delete(result);
            });
        });
    });

    describe('#update()', function() {
        it('user updated', function() {
            user.id = 0;
            return userDao.update(user, (result) => {
                userDao.delete(user);
            });
        });
    });

    describe('#readAll()', function() {
        it('Get all users', function() {
            return userDao.readAll((result) => {});
        });
    });

    describe('#readById()', function() {
        it('Get user by id', function() {
            user.id = 49;
            return userDao.readById(user.id, (result) => {});
        });
    });

    describe('#delete()', function() {
        it('User deleted', function() {
            user.id = 48;
            return userDao.delete(user.id, (result) => {});
        });
    });
});