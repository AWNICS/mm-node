module.exports = (sequelize, DataTypes) => {
    var VisitorHistory = sequelize.define('visitor_history', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        visitorId: {
            type: DataTypes.INTEGER
        },
        doctorId: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.STRING //type of consultation, follow ups, timeline
        },
        prescription: {
            type: DataTypes.STRING //info shared by doc
        },
        prescription_artifacts: {
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
    return VisitorHistory;
};