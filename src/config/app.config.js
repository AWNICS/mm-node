import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import MongoConfig from '../util/conn.mongo';
import MySql from '../util/conn.mysql';
import AllTest from '../test/all.test';
import UserDao from '../apis/user/user.dao';
import http from 'http';
import socket from 'socket.io';
import SocketConfig from '../util/conn.socket';

const log = require('./log4js.config');
const contact = require('../apis/contact/contactUs.controller');
const doctor = require('../apis/doctor/doctorDetails.controller');
const message = require('../apis/message/message.controller');
const user = require('../apis/user/userDetails.controller');
const swaggerSpec = require('./swagger.config');

class Config {
    constructor() {
        this.app = express();
        this.socket = socket;
        this.http = http.createServer(this.app);
        this.io = this.socket(this.http);
        this.dotenv = dotenv;
        this.dotenv.config({ path: '.env.dev' });
        this.mongo = new MongoConfig();
        this.mysql = new MySql();
        this.allTest = new AllTest();
        this.userDao = new UserDao();
        this.socketconfig = new SocketConfig();
    }

    configureApp() {
        this.app.set('port', (process.env.PORT));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.mongo.connect();
        this.mysql.getConnection();
        this.allTest.runTest();
        this.socketconfig.mchat(this.io);
    }

    configureCORS() {
        // Additional middleware which will set headers that we need on each request.
        this.app.use((req, res, next) => {
            // Set permissive CORS header - this allows this server to be used only as
            // an API server in conjunction with something like webpack-dev-server.
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

            // Disable caching so we'll always get the latest userDetails.
            res.setHeader('Cache-Control', 'no-cache');
            next();
        });
    }

    configureRoutes() {
        this.app.use('/contact', contact);
        this.app.use('/doctor', doctor);
        this.app.use('/message', message);
        this.app.use('/user', user);
        this.app.get('/swagger.json', function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });
        this.app.get('/', function(req, res) {
            res.sendFile('index.html', { root: 'C:/ng2/ws/' });;
        });
    }

    listen(port) {
        this.http.listen(port, () => {
            log.info(`Server started: http://localhost:${port}/`);
        });
    }

    run() {
        this.configureApp();
        this.configureCORS()
        this.configureRoutes();
        this.listen(this.app.get('port'));
    }
}

export default Config;