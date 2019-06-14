module.exports = (sequelize, DataTypes) => {
    var ConsultationPrice = sequelize.define('consultation_price', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doctorId: {
            type: DataTypes.INTEGER
        },
        speciality: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0
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
    return ConsultationPrice;
};