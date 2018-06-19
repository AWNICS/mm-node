import visitorStoreModel from './index';
import sequelize from '../../util/conn.mysql';

/*
DAO for VisitorStore api
*/
class VisitorStoreDao {

    /**
     * insert method
     */
    insert(visitorStore, callback) {
        sequelize.sync({ force: false }).then(() => {
            return sequelize.transaction(function(t) {
                return visitorStoreModel.visitor_store.create(visitorStore, { transaction: t }).then(function(visitorStoreCreated) {
                    callback(visitorStoreCreated);
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        return visitorStoreModel.visitor_store.findAll()
            .then((visitorStores) => {
                callback(visitorStores);
            });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        return visitorStoreModel.visitor_store.findById(id)
            .then((visitorStore) => {
                callback(visitorStore);
            });
    }

    /**
     * Update method
     */
    update(visitorStore, id, type, callback) {
        return sequelize.transaction(function(t) {
            return visitorStoreModel.visitor_store
                .update(visitorStore, {
                    where: {
                        id: id,
                        type: type
                    }
                }, { transaction: t })
                .then(function(updatedVisitorStore) {
                    callback(updatedVisitorStore);
                });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        return sequelize.transaction(function(t) {
            return visitorStoreModel.visitor_store
                .destroy({
                    where: {
                        id: id
                    }
                }).then(function(deletedVisitorStore) {
                    callback(deletedVisitorStore);
                });
        });
    }
}

export default VisitorStoreDao;