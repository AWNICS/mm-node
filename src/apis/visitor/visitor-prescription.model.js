module.exports = (sequelize, DataTypes) => {
    var VisitorPrescription = sequelize.define('visitor_prescription', {
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
        consultationId: {
            type: DataTypes.STRING //consultation_group primary key
        },
        type: {
            type: DataTypes.STRING //Criticality related(chronic, immidiate)
        },
        description: { // what patient describes
            type: DataTypes.TEXT, //symptoms, medications, care_info, follow ups notes
            get: function() {
                return JSON.parse(this.getDataValue('description'));
            },
            set: function(description) {
                this.setDataValue('description', JSON.stringify(description));
            }
        },
        issue: { // data that is listed by the doctor
            type: DataTypes.TEXT, //{symptoms, reason, medications_history, medications_response, preventive_stuff, doctor_history, diagnostic_history}
            get: function() {
                return JSON.parse(this.getDataValue('issue'));
            },
            set: function(issue) {
                this.setDataValue('issue', JSON.stringify(issue));
            }
        },
        analysis: { // comments about each issue and analysis about the issue
            type: DataTypes.TEXT, //{for each symptom provide a comment/response}
            get: function() {
                return JSON.parse(this.getDataValue('analysis'));
            },
            set: function(analysis) {
                this.setDataValue('analysis', JSON.stringify(analysis));
            }
        },
        medication: { // medicines prescribed by the doctor
            type: DataTypes.TEXT, //{for each symptom or analysis provide a medicines, provide time, doses etc., any extra comment or warning}
            get: function() {
                return JSON.parse(this.getDataValue('medication'));
            },
            set: function(medication) {
                this.setDataValue('medication', JSON.stringify(medication));
            }
        },
        prescription: { // collation of information and create an object. Never changes once doctor signs it.
            type: DataTypes.STRING, //{brief, responses for medication, expected behaviour, }
            get: function() {
                return JSON.parse(this.getDataValue('prescription'));
            },
            set: function(prescription) {
                this.setDataValue('prescription', JSON.stringify(prescription));
            }
        },
        expectation: {
            type: DataTypes.STRING //{next_consultation/followUps}
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
    return VisitorPrescription;
};