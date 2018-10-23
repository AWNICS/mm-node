module.exports = (sequelize, DataTypes) => {
    var Notification = sequelize.define('notification', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER //for whom this notification is
        },
        type: {
            type: DataTypes.STRING //consultation, medication, reports, registration, reminder, payment
        },
        title: {
            type: DataTypes.STRING //title of the notification
        },
        content: { //content of the notification
            type: DataTypes.TEXT,
            get: function() {
                return JSON.parse(this.getDataValue('content'));
            },
            set: function(content) {
                this.setDataValue('content', JSON.stringify(content));
            }
        },
        status: {
            type: DataTypes.STRING //created, sent, read
        },
        channel: {
            type: DataTypes.STRING //(web(refresh the page for getting all the new notification), sms, email)
        },
        priority: {
            type: DataTypes.INTEGER //low(0)(in the notification list), high(1)(in modal window)
        },
        template: {
            type: DataTypes.TEXT, //from, to, body, signature, attachments
            get: function() {
                return JSON.parse(this.getDataValue('template'));
            },
            set: function(template) {
                this.setDataValue('template', JSON.stringify(template));
            }
        },
        triggerTime: {
            type: DataTypes.DATE //time at which notification needs to be sent
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
    return Notification;
};