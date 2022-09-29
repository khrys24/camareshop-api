const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/list', orderController.list);
router.get('/items', orderController.orderItems);
router.post('/statuschange', orderController.statusChange);
router.post('/cancelorder', orderController.cancelOrder);
router.post('/placeorder', orderController.placeOrder);


module.exports = router;
