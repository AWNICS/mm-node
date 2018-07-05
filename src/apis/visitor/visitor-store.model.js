module.exports = (sequelize, DataTypes) => {
    var VisitorStore = sequelize.define('visitor_store', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        visitorId: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.STRING //here type will be either languages, consultationMode, location/zone
        },
        value: {
            type: DataTypes.STRING //here the value for the corresponding type fields
        }
    }, {
        freezeTableName: true
    });
    return VisitorStore;
};