module.exports = (sequelize, DataTypes) => {
    var DoctorSchedule = sequelize.define('doctor_schedule', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doctorId: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING // online, offline, busy, away
        },
        activity: {
            type: DataTypes.STRING // it could be absent, available for consultation, etc.
        },
        waitTime: {
            type: DataTypes.INTEGER //wait time for a doctor to be available in seconds
        },
        slotId: {
            type: DataTypes.INTEGER
                // slot is a 15mins window for a consultation. Each slot is given an ID for the same 
        },
        startTime: {
            type: DataTypes.DATE // start time is when the doctor is available
        },
        endTime: {
            type: DataTypes.DATE // end time is when the doctor goes offline
        },
        duration: {
            type: DataTypes.INTEGER // total time doctor is available per day
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
    return DoctorSchedule;
};