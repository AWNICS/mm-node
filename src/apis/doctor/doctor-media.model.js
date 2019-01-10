module.exports = (sequelize, DataTypes) => {
    var DoctorMedia = sequelize.define('doctor_media', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        thumbUrl: {
            type: DataTypes.STRING
        },
        type: {
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
    return DoctorMedia;
};