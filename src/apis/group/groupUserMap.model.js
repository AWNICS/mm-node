module.exports = (sequelize, DataTypes) => {
    var ConsultationGroupUserMap = sequelize.define('consultation_group_user_map', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        groupId: {
            type: DataTypes.INTEGER
        },
        userId: {
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
    return ConsultationGroupUserMap;
};