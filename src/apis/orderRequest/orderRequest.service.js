import orderRequestDao from './orderRequest.dao';
import OrderRequest from './orderRequest.model';

class OrderRequestsService {
    constructor() {}

    createOrderRequest(orderRequest, callback) {
        var order = new OrderRequest(orderRequest);
        orderRequestDao.create(order, callback);
    }

    readAllOrderRequests(callback) {
        orderRequestDao.getAll(callback);
    }

    readOrderRequestById(id, callback) {
        orderRequestDao.getById(id, callback);
    }

    removeOrderRequest(id, callback) {
        orderRequestDao.delete(id, callback);
    }

    updateOrderRequest(orderRequest, callback) {
        orderRequestDao.update(orderRequest, callback);
    }
}

export default OrderRequestsService;