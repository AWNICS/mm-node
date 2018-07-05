module.exports = (sequelize, DataTypes) => {
    var DoctorReview = sequelize.define('doctor_reviews', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doctorId: {
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER //reviewedBy
        },
        name: {
            type: DataTypes.STRING
        },
        ratingValue: {
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
    return DoctorReview;
};