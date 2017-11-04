import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mySql from 'mysql';
import dotenv from 'dotenv';

const log = require('./log4js.config');
const contact = require('../apis/contact/contactUs.controller');
const doctor = require('../apis/doctor/doctorDetails.controller');
const message = require('../apis/message/message.controller');
const user = require('../apis/user/userDetails.controller');
const swaggerSpec = require('./swagger.config');

class Config {
    constructor() {
        this.app = express();
        this.mongoose = mongoose;
        this.mysql = mySql;
        this.dotenv = dotenv;
        this.dotenv.config({ path: '.env.dev' });
    }

    configureApp() {
        this.app.set('port', (process.env.PORT));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        //Set up default mongoose connection
        this.mongoose.Promise = global.Promise;
        this.mongoose.connect(process.env.MONGODB_URI, {
            useMongoClient: true
        });
        //Bind connection to error event (to get notification of connection errors)
        this.mongoose.connection.on('error', (err) => {
            if (err) throw err;
            log.error("Something went wrong with MongoDB connection: ", err);
            process.exit();
        });
        log.info("Connection established successfully for MongoDB");

        // configuring mysql
        const connection = this.mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        });

        // connecting to mysqldb
        connection.connect((err) => {
            if (err) {
                this.log.error("Something went wrong with MySql connection: ", err);
                throw err;
            }
            log.info('Connection established successfully for MySQL');
        });
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