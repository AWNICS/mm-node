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
            type: DataTypes.INTEGER
        },
        height: {
            type: DataTypes.INTEGER
        },
        bloodGroup: {
            type: DataTypes.STRING
        },
        allergies: {
            type: DataTypes.TEXT
        },
        location: {
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