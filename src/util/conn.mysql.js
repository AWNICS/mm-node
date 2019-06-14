import Sequelize from 'sequelize';
import log from '../config/log4js.config'

var sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
    pool: {
        max: 10,
        min: 0,
        idle: 10000,
        acquire: 10000,
        handleDisconnects: true,
        evict: 60000,
        connectRetries: 5
    }
});

sequelize = sequelize;

/**
 * connection authentication
 */
sequelize.authenticate()
    .then(() => {
        log.info('connection successfull for sequelize');
        sequelize.query("update user set socketId='[]' where id > 0", { type: sequelize.QueryTypes.UPDATE}).then((res)=>{
            log.info('Cleared all socketIDs in database');
        }).catch(err => log.error(err))
  .then(users => {
    // We don't need spread here, since only the results will be returned for select queries
  })
    })
    .catch(error => log.error('error in connection: ', error));

module.exports = sequelize;