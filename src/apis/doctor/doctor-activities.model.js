module.exports = (sequelize, DataTypes) => {
    var DoctorActivity = sequelize.define('doctor_activities', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doctorId: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING //title of the activity
        },
        comment: {
            type: DataTypes.STRING
        },
        like: {
            type: DataTypes.INTEGER
        },
        dislike: {
            type: DataTypes.INTEGER
        },
        mediaType: {
            type: DataTypes.STRING
        },
        mediaUrl: {
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
    return DoctorActivity;
};