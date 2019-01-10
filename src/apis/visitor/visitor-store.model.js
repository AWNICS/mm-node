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
            type: DataTypes.TEXT,
            get: function() {
                return JSON.parse(this.getDataValue('value'));
            },
            set: function(value) {
                this.setDataValue('value', JSON.stringify(value));
            }
        }
    }, {
        freezeTableName: true
    });
    return VisitorStore;
};