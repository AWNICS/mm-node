import languageModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Languages api
*/
class LanguagesDao {
    constructor() {}

    /**
     * insert method
     */
    insert(language, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                languageModel.languages.create(language, { transaction: t }).then(function(languageInserted) {
                    callback(languageInserted);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        languageModel.languages.findAll().then((languages) => {
            callback(languages);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        languageModel.languages.find({ where: { id: id } }).then((language) => {
            callback(language);
        });
    }

    /**
     * Update method
     */
    update(language, callback) {
        sequelize.transaction().then(function(t) {
            languageModel.languages.update(language, {
                where: {
                    id: language.id
                }
            }, { transaction: t }).then(function(languageUpdated) {
                callback(languageUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.error('Error in language dao update ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            languageModel.languages.destroy({
                where: {
                    id: id
                }
            }).then(function(languageDeleted) {
                callback(languageDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default LanguagesDao;