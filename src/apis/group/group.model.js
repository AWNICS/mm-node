module.exports = (sequelize, DataTypes) => {
    var Group = sequelize.define('Group', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        picture: {
            type: DataTypes.STRING
        }
    });
    return Group;
};