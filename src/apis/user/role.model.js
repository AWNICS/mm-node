module.exports = (sequelize, DataTypes) => {
    var Role = sequelize.define('role', {
        id: {
            type: DataTypes.DOUBLE,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.DOUBLE
        },
        name: {
            type: DataTypes.STRING //user(R), bot(CR), admin(CRUD), doctor(CR)
        },
        privilege: {
            type: DataTypes.STRING //create, update, delete
        }
    }, {
        freezeTableName: true
    });
    return Role;
};