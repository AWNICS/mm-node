module.exports = (sequelize, DataTypes) => {
    var Locations = sequelize.define('locations', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        latMin: {
            type: DataTypes.DOUBLE
        },
        lngMin: {
            type: DataTypes.DOUBLE
        },
        latMax: {
            type: DataTypes.DOUBLE
        },
        lngMax: {
            type: DataTypes.DOUBLE
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
    return Locations;
};