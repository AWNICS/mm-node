module.exports = (sequelize, DataTypes) => {
    var GroupUser = sequelize.define('GroupUser', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        groupId: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.STRING
        },
        createdBy: {
            type: DataTypes.STRING
        },
        updatedBy: {
            type: DataTypes.STRING
        }
    });
    return GroupUser;
};