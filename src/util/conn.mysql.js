import Sequelize from 'sequelize';
import log from '../config/log4js.config'

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
    .then(() => log.info('connection successfull for sequelize'))
    .catch(error => log.error('error in connection: ', error));

module.exports = sequelize;