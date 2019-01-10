module.exports = (sequelize, DataTypes) => {
    var VisitorDiagnostic = sequelize.define('visitor_diagnostic', {
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
        reportId: {
            type: DataTypes.INTEGER //mapping to visitor_reports table
        },
        type: {
            type: DataTypes.STRING
        },
        result: {
            type: DataTypes.STRING, //JSON data eg blood test, urine test etc.
            get: function() {
                return JSON.parse(this.getDataValue('result'));
            },
            set: function(result) {
                this.setDataValue('result', JSON.stringify(result));
            }
        },
        result_observation: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING //-ve, +ve
        },
        testDate: {
            type: DataTypes.DATE
        },
        reportDate: {
            type: DataTypes.DATE
        },
        vendor: {
            type: DataTypes.STRING //in house, 3rd party etc
        },
        report_observation: {
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
    return VisitorDiagnostic;
};