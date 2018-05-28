module.exports = (sequelize, DataTypes) => {
    var Doctor = sequelize.define('doctor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        regNo: {
            type: DataTypes.STRING
        },
        sex: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        speciality: {
            type: DataTypes.STRING
        },
        experience: {
            type: DataTypes.DOUBLE
        },
        description: {
            type: DataTypes.STRING
        },
        videoUrl: {
            type: DataTypes.STRING
        },
        appearUrl: {
            type: DataTypes.STRING
        },
        waitingTime: {
            type: DataTypes.NUMERIC
        },
        ratingValue: {
            type: DataTypes.NUMERIC
        },
        ratingCount: {
            type: DataTypes.NUMERIC
        },
        shortBio: {
            type: DataTypes.STRING
        },
        longBio: {
            type: DataTypes.STRING
        },
        createdBy: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        termsAccepted: {
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTableName: true
    });
    return Doctor;
};