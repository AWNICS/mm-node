import UserDao from '../apis/user/user.dao';
//import User from '../apis/user/user.model';

var User = require('../apis/user/user.model');
var sequelize = require('../util/conn.mysql');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//create user object 
var user = new User();
var readUser = new User();
var insertedData = new User();
var pk = 3;

class UserDaoTest {
    constructor() {
        this.userDao = new UserDao();
    }

    testAll() {
        //call all methods like testInsert(), testDelete() etc.. here
        this.testInsert();
        //this.testUpdate();
        //this.testDelete();
        //this.testRead();
    }

    //insert method
    testInsert() {
        // composite form
        user = {
            name: 'nisha',
            email: 'nisha@gmail.com',
            phoneNo: 8978,
            picUrl: 'nisha',
            description: 'SI',
            status: 'active',
            waitingTime: 10,
            rating: 7
        };

        //call insert user with above data

        // force: true will drop the table if it already exists
        User.sync({ force: false }).then(() => {
            insertedData = User.create(user).then(function(user) {
                console.log('Entry successful: ' + JSON.stringify(user));

                //fetch PK of inserted record
                pk = user.id;
                console.log('ID: ' + pk);
                return user;
            });
        });

        // search for known ids

        setTimeout(function() {
            User.findById(pk).then(user => {
                console.log('value of this id ' + pk + ' is ' + JSON.stringify(user));
            });

            //read user data
            readUser = User.findById(pk).then(user => {
                console.log('from read user' + JSON.stringify(user));
                return user;
            });
        }, 5000);

        //call read user with pk in argument and return a user object



        //check the inserted data and read data is same or not

        //(assert) if valid test pass else test fail
    }

    //testRead
    testRead(user) {
        User.findAll().then(user => {
            console.log('data from testread' + JSON.stringify(user));
        })
    }

    //testDelete
    testDelete() {
        User.destroy({
            where: {
                name: 'nisha'
            }
        });
        console.log('entry deleted');
        console.log('data from testDelete' + JSON.stringify(user));
    }

    //testUpdate
    testUpdate() {
        User.update({
            email: 'nilu@gmail.com',
        }, {
            where: {
                name: 'nisha'
            }
        });
        console.log('data from testUpdate' + JSON.stringify(user));
    }
}

export default UserDaoTest;