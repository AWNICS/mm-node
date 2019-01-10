import log from '../../config/log4js.config';
import auditDao from './audit.dao';

class AuditService {
    /**
     * for audit model
     */
    create(audit, callback) {
        auditDao.create(audit, callback);
    }

    readAll(callback) {
        auditDao.getAll(callback);
    }

    readById(id, callback) {
        auditDao.getById(id, callback);
    }

    update(message, id, callback) {
        auditDao.update(message, id, callback);
    }

    remove(id, callback) {
        auditDao.delete(id, callback);
    }
}

export default AuditService;