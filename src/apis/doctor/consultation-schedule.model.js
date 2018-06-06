module.exports = (sequelize, DataTypes) => {
    var ConsultationSchedule = sequelize.define('consultation_schedule', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        patientId: {
            type: DataTypes.INTEGER
        },
        doctorId: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        createdBy: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        lastActive: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });
    return ConsultationSchedule;
};