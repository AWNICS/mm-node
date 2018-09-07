module.exports = (sequelize, DataTypes) => {
    var VisitorAppointment = sequelize.define('visitor_appointment', {
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
        status: {
            type: DataTypes.STRING //missed, appear(appointments)
        },
        activity: {
            type: DataTypes.STRING
        },
        slotId: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.STRING //new consultations, reminders, follow ups consultaions
        },
        waitTime: {
            type: DataTypes.INTEGER
        },
        startTime: {
            type: DataTypes.DATE // start time is when the doctor is available
        },
        endTime: {
            type: DataTypes.DATE // end time is when the doctor goes offline
        },
        duration: {
            type: DataTypes.INTEGER
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
    return VisitorAppointment;
};