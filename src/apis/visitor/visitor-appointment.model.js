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
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING //new consultations, reminders, follow ups consultaions
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