module.exports = (sequelize, DataTypes) => {
    var StaffInfo = sequelize.define('staff_info', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        sex: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        department: {
            type: DataTypes.STRING
        },
        staffId: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING
        },
        createdBy: {
            type: DataTypes.STRING
        },
        updatedBy: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });
    return StaffInfo;
};