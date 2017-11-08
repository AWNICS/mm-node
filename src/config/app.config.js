import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import MongoConfig from '../util/conn.mongo';
import MySql from '../util/conn.mysql';

const log = require('./log4js.config');
const contact = require('../apis/contact/contactUs.controller');
const doctor = require('../apis/doctor/doctorDetails.controller');
const message = require('../apis/message/message.controller');
const user = require('../apis/user/userDetails.controller');
const swaggerSpec = require('./swagger.config');

class Config {
    constructor() {
        this.app = express();
        this.dotenv = dotenv;
        this.dotenv.config({ path: '.env.dev' });
        this.mongo = new MongoConfig();
        this.mysql = new MySql();
    }

    configureApp() {
        this.app.set('port', (process.env.PORT));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.mongo.connect();
        this.mysql.getConnection();
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
    }

    listen(port) {
        this.app.listen(port, () => {
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