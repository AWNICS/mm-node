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
            type: DataTypes.STRING //thumb url of pic or video snapshot
        },
        type: {
            type: DataTypes.STRING //value can be 'award','honour','signature','video'
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