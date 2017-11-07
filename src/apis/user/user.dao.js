var db = require('../../util/conn.mysql');

/*
    DAO for user api
*/
class UserDao {
    constructor() {
        this.connection = db.getConnection();
    }

    //create user
    createUser(req, res, next) {
        var sql = "CREATE TABLE user1(id int, name VARCHAR(255), email VARCHAR(255), phoneNo int)";
        this.connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log("user table created");
        });
    }

    //insert user
    insertUser(req, res, next) {
        var insertRecord = 'INSERT INTO user1 VALUES(2, "jhon", "jhon@gmail.com", 907987)';
        this.connection.query(insertRecord, (err, rows) => {
            if (err) throw err;
            console.log(rows);
        });
    }

    //read user
    readUser(req, res, next) {
        var readTable = 'SELECT * FROM user1';
        this.connection.query(readTable, (err, rows) => {
            if (err) throw err;
            console.log('Data received from user:\n');
            console.log(rows);
        });
    }

    /*
        update user
    */
    updateUser(req, res, next) {
        var updateRecord = 'UPDATE user SET name = "joe" WHERE name="Nisha"';
        this.connection.query(updateRecord, function(err, result) {
            if (err) throw err;
            console.log('updated');
        });
    }

    /*
        delete user
    */
    deleteUser(req, res, next) {
        var deleteRecord = 'DELETE FROM user WHERE name="joe"';
        this.connection.query(deleteRecord, function(err, result) {
            if (err) throw err;
            console.log('delete rows');
        });
    }
}

export default UserDao;