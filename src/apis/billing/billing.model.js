module.exports = (sequelize, DataTypes) => {
    var Billing = sequelize.define('billing', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        requestedId: {
            type: DataTypes.INTEGER //this will the doctorId for which it is created
        },
        targetId: {
            type: DataTypes.INTEGER // this will be visitorId for which visitor it is created
        },
        consultationId: {
            type: DataTypes.INTEGER //this is the group's primary key
        },
        status: {
            type: DataTypes.STRING //due, paid
        },
        amount: {
            type: DataTypes.TEXT, //consultation charges, taxes((cgst, sgst(inside Karnataka)), igst(outside Karnataka))
            get: function() {
                return JSON.parse(this.getDataValue('amount'));
            },
            set: function(amount) {
                this.setDataValue('amount', JSON.stringify(amount));
            }
        },
        date: {
            type: DataTypes.DATE //date on which the bill generated
        },
        description: {
            type: DataTypes.STRING //regarding billing details
        },
        referenceNumber: {
            type: DataTypes.STRING //after payment done, it is generated
        },
        modeOfPayment: {
            type: DataTypes.STRING //free credits, net banking, payment gateways etc.
        },
        url: {
            type: DataTypes.STRING //filename of the billing pdf
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
    return Billing;
};