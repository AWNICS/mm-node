module.exports = (sequelize, DataTypes) => {
    var Doctor = sequelize.define('doctor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        regNo: {
            type: DataTypes.STRING
        },
        validity: {
            type: DataTypes.DATE //validity of MCI number
        },
        sex: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING
        },
        speciality: {
            type: DataTypes.TEXT,
            get: function() {
                return JSON.parse(this.getDataValue('speciality'));
            },
            set: function(speciality) {
                this.setDataValue('speciality', JSON.stringify(speciality));
            }
        },
        experience: {
            type: DataTypes.DOUBLE
        },
        description: {
            type: DataTypes.STRING
        },
        videoUrl: {
            type: DataTypes.STRING
        },
        appearUrl: {
            type: DataTypes.STRING
        },
        waitingTime: {
            type: DataTypes.NUMERIC
        },
        ratingValue: {
            type: DataTypes.NUMERIC
        },
        ratingCount: {
            type: DataTypes.NUMERIC
        },
        shortBio: {
            type: DataTypes.STRING
        },
        longBio: {
            type: DataTypes.TEXT
        },
        education: {
            type: DataTypes.STRING //educational degree
        },
        educationYear: {
            type: DataTypes.INTEGER
        },
        institution: {
            type: DataTypes.STRING //training institution
        },
        institutionYear: {
            type: DataTypes.INTEGER
        },
        workhistory: {
            type: DataTypes.TEXT,
            get: function (){
                return JSON.parse(this.getDataValue('workhistory'))
            },
            set: function(workhistory) {
                this.setDataValue('workhistory', JSON.stringify(workhistory));
            }
        },
        createdBy: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        termsAccepted: {
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTableName: true
    });
    return Doctor;
};