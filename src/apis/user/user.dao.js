var User = require('./user.model');

/*
    DAO for user api
*/
class UserDao {
    constructor() {}

    /*
        insert method
    */
    insert(user) {
        var pk;
        // force: true will drop the table if it already exists
        User.create(user).then(function(user) {
            console.log('Entry successful from dao: ' + JSON.stringify(user));
            //return generated pk
            pk = user.id;
            console.log('ID: ' + pk);
        });
        return pk;
    }

    /*
        read method
    */
    readAll() {
        User.findAll().then(user => {
            console.log('data from read' + JSON.stringify(user));
        })
    }

    readById(user) {
        User.findById(user.id).then(user => {
            console.log('data from read' + JSON.stringify(user));
        });
        return user;
    }

    /*
        Delete method
    */
    deleteById(id) {
        User.destroy({
            where: {
                id: id
            }
        });
        console.log('entry deleted');
    }

    /*
        Update
    */
    update(id) {
        User.update({
            name: 'nilu'
        }, {
            where: {
                id: id
            }
        });
        console.log('data Updated');
    }
}

export default UserDao;