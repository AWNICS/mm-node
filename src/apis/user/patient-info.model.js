module.exports = (sequelize, DataTypes) => {
    var PatientInfo = sequelize.define('patient_info', {
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
            type: DataTypes.STRING
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
    return PatientInfo;
};