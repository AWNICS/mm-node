import visitorTimelineModel from './index';
import sequelize from '../../util/conn.mysql';
import log from '../../config/log4js.config';

/**
 * DAO for visitor-timeline
 */
class VisitorTimelineDao {

    /**
     * insert method
     */
    insert(visitorTimeline, callback) {
        console.log('data in dao:' + JSON.stringify(visitorTimeline));
        sequelize.sync({ force: false }).then(() => {
            sequelize.transaction().then(function(t) {
                visitorTimelineModel.visitor_timeline.create(visitorTimeline, { transaction: t }).then(function(insertedVisitorTimeline) {
                    callback(insertedVisitorTimeline);
                }).then(function() {
                    t.commit();
                }).catch(function(error) {
                    log.error('error in visitorTimelineDao ', error);
                    t.rollback();
                });
            });
        });
    }

    /**
     * read all method
     */
    readAll(callback) {
        visitorTimelineModel.visitor_timeline.findAll().then((visitorTimelines) => {
            callback(visitorTimelines);
        });
    }

    /**
     * read method based on id
     */
    readById(id, callback) {
        visitorTimelineModel.visitor_timeline.find({ where: { visitorId: id } }).then((visitorTimeline) => {
            callback(visitorTimeline);
        });
    }

    /**
     * Update method
     */
    update(visitorTimeline, callback) {
        sequelize.transaction().then(function(t) {
            visitorTimelineModel.visitor_timeline.update(visitorTimeline, {
                where: {
                    visitorId: visitorTimeline.visitorId
                }
            }, { transaction: t }).then(function(visitorTimelineUpdated) {
                callback(visitorTimelineUpdated);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }

    /**
     * Delete method
     */
    delete(id, callback) {
        sequelize.transaction().then(function(t) {
            visitorTimelineModel.visitor_timeline.destroy({
                where: {
                    id: id
                }
            }).then(function(visitorTimeline) {
                callback(visitorTimeline);
            }).then(function() {
                t.commit();
            }).catch(function(error) {
                t.rollback();
            });
        });
    }
}

module.exports = VisitorTimelineDao;