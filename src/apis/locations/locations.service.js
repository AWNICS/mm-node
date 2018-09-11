import LocationsDao from './locations.dao';

const locationsDao = new LocationsDao();

class LocationsService {

    create(location, callback) {
        locationsDao.insert(location, callback);
    }

    readAll(callback) {
        locationsDao.readAll(callback);
    }

    readById(id, callback) {
        locationsDao.readById(id, callback);
    }

    remove(id, callback) {
        locationsDao.delete(id, callback);
    }

    update(location, callback) {
        locationsDao.update(location, callback);
    }
}

export default LocationsService;