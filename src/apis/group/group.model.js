module.exports = (sequelize, DataTypes) => {
    var Group = sequelize.define('group', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        picture: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        phase: {
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
    return Group;
};