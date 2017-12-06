import Sequelize from 'sequelize';

var sequelize = new Sequelize('test', 'arun', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false
});

sequelize = sequelize;

/**
 * connection authentication
 */
sequelize.authenticate()
    .then(() => console.log('connection successfull for sequelize'))
    .catch(error => console.error('error in connection: ', error));

module.exports = sequelize;