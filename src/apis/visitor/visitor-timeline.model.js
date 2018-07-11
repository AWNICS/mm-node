module.exports = (sequelize, DataTypes) => {
    var VisitorTimeline = sequelize.define('visitor_timeline', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        visitorId: {
            type: DataTypes.INTEGER
        },
        timestamp: {
            type: DataTypes.DATE
        },
        consultations: {
            type: DataTypes.TEXT, //doctor name, time, speciality, appointment details
            get: function() {
                return JSON.parse(this.getDataValue('consultations'));
            },
            set: function(consultations) {
                this.setDataValue('consultations', JSON.stringify(consultations));
            }
        },
        reminders: {
            type: DataTypes.TEXT, //type, message, description
            get: function() {
                return JSON.parse(this.getDataValue('reminders'));
            },
            set: function(reminders) {
                this.setDataValue('reminders', JSON.stringify(reminders));
            }
        },
        events: {
            type: DataTypes.TEXT, //type, message
            get: function() {
                return JSON.parse(this.getDataValue('events'));
            },
            set: function(events) {
                this.setDataValue('events', JSON.stringify(events));
            }
        },
        createdBy: {
            type: DataTypes.INTEGER
        },
        updatedBy: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true
    });
    return VisitorTimeline;
};