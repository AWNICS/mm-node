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
            type: DataTypes.INTEGER //consultation_group's primary key
        },
        type: {
            type: DataTypes.STRING //Criticality related(chronic, immidiate)
        },
        description: {
            type: DataTypes.STRING, //symptoms, medications, care_info, follow ups notes
        },
        issue: {
            type: DataTypes.STRING, //{symptoms, reason, medications_history, medications_response, preventive_stuff, doctor_history, diagnostic_history}
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
        diagnostic: {
            type: DataTypes.TEXT, //store the list of diagnostics provided in prescription pdf
            get: function() {
                return JSON.parse(this.getDataValue('diagnostic'));
            },
            set: function(diagnostic) {
                this.setDataValue('diagnostic', JSON.stringify(diagnostic));
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
        instructions: {
            type: DataTypes.STRING //special instructions provided in prescription pdf
        },
        url: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        speciality: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        consultationMode:{
            type: DataTypes.STRING,
            defaultValue: null
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