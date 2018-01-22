module.exports = (sequelize, DataTypes) => {
    var GroupUserMap = sequelize.define('group_user_map', {
        id: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            autoIncrement: true
        },
        groupId: {
            type: DataTypes.DOUBLE
        },
        userId: {
            type: DataTypes.DOUBLE
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
    return GroupUserMap;
};