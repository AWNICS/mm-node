module.exports = (sequelize, DataTypes) => {
    var Contact = sequelize.define('Contact', {
        id: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        picUrl: {
            type: DataTypes.STRING
        },
        regNo: {
            type: DataTypes.STRING
        },
        speciality: {
            type: DataTypes.STRING
        },
        experience: {
            type: DataTypes.NUMERIC
        },
        description: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNo: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        waitingTime: {
            type: DataTypes.NUMERIC
        },
        rating: {
            type: DataTypes.NUMERIC
        },
        videoUrl: {
            type: DataTypes.STRING
        },
        appearUrl: {
            type: DataTypes.STRING
        },
        thumbnailUrl: {
            type: DataTypes.STRING
        },
        termsAccepted: {
            type: DataTypes.BOOLEAN
        }
    });
    return Contact;
};