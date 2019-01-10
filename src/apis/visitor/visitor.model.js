module.exports = (sequelize, DataTypes) => {
    var Visitor = sequelize.define('visitor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        sex: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        weight: {
            type: DataTypes.FLOAT
        },
        height: {
            type: DataTypes.FLOAT
        },
        bloodGroup: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
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
    return Visitor;
};