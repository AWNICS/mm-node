import dotenv from 'dotenv';

var mysql = require('mysql');
var connection;
dotenv.config({ path: '.env.dev' });

module.exports = {
    /*
        getting the sequelize connection
    */
    getConnection: () => {
        //implemetation of sequelize
        const Sequelize = require('sequelize');
        const sequelize = new Sequelize('test', 'arun', 'password', {
            host: 'localhost',
            dialect: 'mysql',
        });

        //connection test
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });


        /*var dbname = 'test';
        if (connection)
            return connection;
        else {
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: dbname
            });

            connection.connect((err) => {
                if (err) throw err;
                console.log('Connected');
            });
        }*/
        return sequelize;
    }
};