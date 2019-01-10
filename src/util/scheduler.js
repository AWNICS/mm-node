const schedule = require('node-schedule');

import NotificationService from '../apis/notification/notification.service';
import visitorAppointmentModel from '../apis/visitor/index';
import GroupService from '../apis/group/group.service';

const notificationService = new NotificationService();
const Op = require('sequelize').Op;
const groupService = new GroupService();

class Scheduler {

    /**
     * notifications for consultation info
     */
    notificationScheduler() {
        schedule.scheduleJob('*/30 * * * * *', function() {
            notificationService.readByTime((allNotifications) => {
                allNotifications.map((notification) => {
                    visitorAppointmentModel.visitor_appointment.findAll({
                        where: {
                            doctorId: notification.userId,
                            startTime: {
                                [Op.gt]: Date.now()
                            }
                        }
                    }).then((visitorAppointment) => {
                        var groups = groupService.getAllGroupsByUserId(visitorAppointment.visitorId);
                        return { notification: notification, group: groups[1] };
                    });
                });
            });
        });
    }
}

export default Scheduler;