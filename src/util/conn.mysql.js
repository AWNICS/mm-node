import dotenv from 'dotenv';

var mysql = require('mysql');
var connection;
dotenv.config({ path: '.env.dev' });

module.exports = {
    /*
        getting the sequelize connection
    */
    getConnection: () => {
        const Sequelize = require('sequelize');
        const sequelize = new Sequelize('test', 'arun', 'password', {
            host: 'localhost',
            dialect: 'mysql',
            operatorsAliases: false
        });

        /*
            connection test
        */
        /*
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        */
        return sequelize;
    }
};