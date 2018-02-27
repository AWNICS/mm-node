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
import http from 'http';
import socket from 'socket.io';
import socketService from '../apis/sockets/socket.service';
import log from './log4js.config';
import doctor from '../apis/doctor/doctor.controller';
import fileUpload from '../apis/file-upload/file-upload.controller';
import message from '../apis/message/message.controller';
import swaggerSpec from './swagger.config';
import user from '../apis/user/user.controller';
import contactUs from '../apis/contact/contactUs.controller';
import group from '../apis/group/group.controller';
import orderRequest from '../apis/orderRequest/orderRequest.controller';
import specialities from '../apis/specialities/specialities.controller';

class Config {
    constructor() {
        this.app = express();
        this.session = session;
        this.flash = flash;
        this.socket = socket;
        this.http = http.Server(this.app);
        this.io = this.socket.listen(this.http);
        this.dotenv = dotenv;
        /*this.passport = passport;
        this.LocalStrategy = passportLocal.Strategy;
        this.ExtractJwt = passportJWT.ExtractJwt;
        this.JwtStrategy = passportJWT.Strategy;
        this.jwt = jwt;*/
        this.lodash = lodash;
        this.dotenv.config({ path: '.env.dev' });
        this.mongo = new MongoConfig();

    }

    configureApp() {
        this.app.set('port', (process.env.PORT));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.mongo.connect();
        //this.app.set('superSecret', 'secretsareoutdated');
        // Express Session
        /*this.app.use(session({
            secret: 'secret',
            saveUninitialized: true,
            resave: true
        }));*/
        // Express Flash
        //this.app.use(this.flash());
        socketService.connectSocket(this.io);
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
        this.app.use('/doctor', doctor);
        this.app.use('/file', fileUpload);
        this.app.use('/message', message);
        this.app.use('/user', user);
        this.app.use('/contact', contactUs);
        this.app.use('/group', group);
        this.app.use('/specialities', specialities);
        this.app.use('/orderRequest', orderRequest);
        this.app.get('/swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
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