import UserDao from '../apis/user/user.dao';
var User = require('../apis/user/user.model');
import UtilsObject from '../util/utils.object';

/*
    user dao test 
*/
class UserDaoTest {
    constructor() {
        this.userDao = new UserDao();
        this.compare = new UtilsObject();
    }

    /*
        all CRUD method calls
    */
    testAll() {
        //this.testInsert();
        this.testUpdate();
        //this.testDelete();
        //this.testRead();
        //this.compare();
    }

    /*
        insert method
    */
    testInsert() {
        // composite form
        var user = {
            name: 'nisha',
            email: 'nisha@gmail.com',
            phoneNo: 8978,
            picUrl: 'nisha',
            description: 'SI',
            status: 'active',
            waitingTime: 10,
            rating: 7
        };

        /*
            calling insert user with above data
        */
        var pk = this.userDao.insert(user);
        console.log('pk value: ' + pk);
        //var obj1 = this.userDao.readById(pk);
        console.log('obj1 value: ' + user);
        //this.testReadById(obj1);
    }

    testReadById(obj1) {
        var obj2 = this.userDao.readById(obj1);
        this.compare.compare(obj1, obj2);
        this.testDelete(obj1);
    }

    /*
        testRead method
    */
    testRead() {
        this.userDao.readAll();
    }

    /*
        testDelete method
    */
    testDelete() {
        this.userDao.deleteById(5);
    }

    /*
        testUpdate method
    */
    testUpdate() {
        this.userDao.update(6);
    }
}

export default UserDaoTest;