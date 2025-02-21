const express = require('express');
const { addOrder, getOrders, getOrder } = require('../controllers/order.controller');
const { isAuth } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/', isAuth ,addOrder);
router.get('/', isAuth ,getOrders);
router.get('/:id', getOrder);

module.exports = router;