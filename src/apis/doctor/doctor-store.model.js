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
            type: DataTypes.STRING //here the value for the corresponding type fields
        }
    }, {
        freezeTableName: true
    });
    return DoctorStore;
};