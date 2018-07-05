module.exports = (sequelize, DataTypes) => {
    var VisitorMedia = sequelize.define('visitor_media', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        visitorId: {
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
            type: DataTypes.STRING //images, video, audio
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
    return VisitorMedia;
};