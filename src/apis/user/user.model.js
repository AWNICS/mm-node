module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        phoneNo: {
            type: DataTypes.STRING,
            unique: true
        },
        aadhaarNo: {
            type: DataTypes.BIGINT
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
        token: {
            type: DataTypes.STRING
        },
        activate: {
            type: DataTypes.NUMERIC,
            defaultValue: 0
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        socketId: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        createdBy: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            defaultValue: null
        }
    }, {
        freezeTableName: true
    });
    return User;
};