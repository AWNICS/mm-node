import doctorReviewModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/*
DAO for Doctor api
*/
class DoctorReviewDao {
    constructor() {}

    /**
     * insert method
     */
    insert(doctorReview, callback) {
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                doctorReviewModel.doctor_reviews.create(doctorReview, { transaction: t }).then(function(doctorReviewInserted) {
                    callback(doctorReviewInserted);
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
        doctorReviewModel.doctor_reviews.findAll().then((allDoctorReview) => {
            callback(allDoctorReview);
        });
    }

    /**
     * read method based on id
     */
    readById(doctorId, callback) {
        doctorReviewModel.doctor_reviews.findAll({ where: { doctorId: doctorId } }).then((doctorReview) => {
            callback(doctorReview);
        });
    }

    /**
     * Update method
     */
    update(doctorReview, callback) {
        sequelize.transaction().then(function(t) {
            doctorReviewModel.doctor_reviews.update(doctorReview, {
                where: {
                    userId: doctorReview.userId
                }
            }, { transaction: t }).then(function(doctorReviewUpdated) {
                callback(doctorReviewUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                log.error('Error in doctor review dao update ', error);
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            doctorReviewModel.doctor_reviews.destroy({
                where: {
                    id: id
                }
            }).then(function(doctorReviewDeleted) {
                callback(doctorReviewDeleted);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

export default DoctorReviewDao;