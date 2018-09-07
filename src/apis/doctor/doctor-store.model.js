module.exports = (sequelize, DataTypes) => {
    var DoctorStore = sequelize.define('doctor_store', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.STRING //here type will be either qualifications, languages, consultationMode, location/zone, professinal_society
        },
        value: {
            type: DataTypes.TEXT, //here the value for the corresponding type fields
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
    return DoctorStore;
};