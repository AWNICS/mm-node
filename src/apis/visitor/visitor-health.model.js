module.exports = (sequelize, DataTypes) => {
    var VisitorHealth = sequelize.define('visitor_health', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        visitorId: {
            type: DataTypes.INTEGER //userId or patientId
        },
        allergies: {
            type: DataTypes.TEXT,
            get: function() {
                return JSON.parse(this.getDataValue('allergies'));
            },
            set: function(allergies) {
                this.setDataValue('allergies', JSON.stringify(allergies));
            }
        },
        foodHabits: {
            type: DataTypes.TEXT,
            get: function() {
                return JSON.parse(this.getDataValue('foodHabits'));
            },
            set: function(foodHabits) {
                this.setDataValue('foodHabits', JSON.stringify(foodHabits));
            }
        },
        vitals: {
            type: DataTypes.TEXT,
            get: function() {
                return JSON.parse(this.getDataValue('vitals'));
            },
            set: function(vitals) {
                this.setDataValue('vitals', JSON.stringify(vitals));
            }
        },
        startTime: {
            type: DataTypes.DATE //chickenpox from 2012-11-02 to 2012-12-01 same for allergies and other habits
        },
        endTime: {
            type: DataTypes.DATE
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
    return VisitorHealth;
};