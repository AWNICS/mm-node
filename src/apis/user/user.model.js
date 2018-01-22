//import sequelize from '../../util/conn.mysql';

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNo: {
            type: DataTypes.STRING
        },
        picUrl: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        waitingTime: {
            type: DataTypes.NUMERIC
        },
        rating: {
            type: DataTypes.NUMERIC
        },
        token: {
            type: DataTypes.STRING
        },
        activate: {
            type: DataTypes.NUMERIC,
            defaultValue: 0
        },
        privilege: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        socketId: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        createdBy: {
            type: DataTypes.STRING
        },
        updatedBy: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });
    return User;
};