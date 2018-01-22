module.exports = (sequelize, DataTypes) => {
    var Group = sequelize.define('Group', {
        id: {
            type: DataTypes.DOUBLE,
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
            type: DataTypes.DOUBLE
        },
        description: {
            type: DataTypes.STRING
        },
        picture: {
            type: DataTypes.STRING
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
    return Group;
};