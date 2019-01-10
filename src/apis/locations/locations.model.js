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
    return Locations;
};