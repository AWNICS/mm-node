import mongoose from 'mongoose';
import dotenv from 'dotenv';

const log = require('../config/log4js.config');

class MongoConfig {
    constructor() {
        this.mongoose = mongoose;
        this.dotenv = dotenv;
        this.dotenv.config({ path: '.env.dev' });
    }

    connect() {
        //Set up default mongoose connection
        this.mongoose.Promise = global.Promise;
        this.mongoose.connect(process.env.MONGODB_LOCAL_URI, {
            useMongoClient: true
        });
        //Bind connection to error event (to get notification of connection errors)
        this.mongoose.connection.on('error', (err) => {
            if (err) throw err;
            log.error("Something went wrong with MongoDB connection: ", err);
            process.exit();
        });
        this.mongoose.connection.once('open', () => {
            log.info("Connection established successfully for MongoDB");
        });
    }
}

export default MongoConfig;