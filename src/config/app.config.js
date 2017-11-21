import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import lodash from 'lodash';
import MongoConfig from '../util/conn.mongo';
import MySql from '../util/conn.mysql';
import AllTest from '../test/all.test';
import UserDao from '../apis/user/user.dao';

var mongoose = require('mongoose');
var User = require('../apis/loginUser/user.model');
const log = require('./log4js.config');
const contact = require('../apis/contact/contactUs.controller');
const doctor = require('../apis/doctor/doctorDetails.controller');
const message = require('../apis/message/message.controller');
const user = require('../apis/user/userDetails.controller');
const loginUser = require('../apis/loginUser/user.controller');
const swaggerSpec = require('./swagger.config');

class Config {
    constructor() {
        this.app = express();
        this.session = session;
        this.flash = flash;
        this.dotenv = dotenv;
        /*this.passport = passport;
        this.LocalStrategy = passportLocal.Strategy;
        this.ExtractJwt = passportJWT.ExtractJwt;
        this.JwtStrategy = passportJWT.Strategy;
        this.jwt = jwt;*/
        this.lodash = lodash;
        this.dotenv.config({ path: '.env.dev' });
        this.mongo = new MongoConfig();
        this.mysql = new MySql();
        this.allTest = new AllTest();
        this.userDao = new UserDao();
        this.mongoose = mongoose;
    }

    configureApp() {
        this.app.set('port', (process.env.PORT));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.mongo.connect();
        this.mysql.getConnection();
        this.app.set('superSecret', 'secretsareoutdated');
        // Express Session
        this.app.use(session({
            secret: 'secret',
            saveUninitialized: true,
            resave: true
        }));
        // Express Flash
        this.app.use(this.flash());
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
        this.app.use('/loginUser', loginUser);
        this.app.get('/', (req, res) => {
            res.setHeader('Content-Type', 'text/html');
            res.send(`
            <h1>Mesomeds</h1>
            `);
        });
        this.app.get('/swagger.json', (req, res) => {
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