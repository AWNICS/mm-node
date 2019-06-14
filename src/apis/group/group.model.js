module.exports = (sequelize, DataTypes) => {
    var ConsultationGroup = sequelize.define('consultation_group', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER
        },
        doctorId: {
            type: DataTypes.INTEGER
        },
        details: {
            type: DataTypes.TEXT,
            get: function() {
                return JSON.parse(this.getDataValue('details'));
            },
            set: function(details) {
                this.setDataValue('details', JSON.stringify(details));
            }
        },
        speciality:{
            type: DataTypes.STRING,
        },
        picture: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        phase: {
            type: DataTypes.STRING //active,inactive,archive,botInactive
        },
        requireInfo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        prescription_generated: {
            type: DataTypes.TINYINT, //active,inactive,archive,botInactive
            defaultValue: false
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
    return ConsultationGroup;
};