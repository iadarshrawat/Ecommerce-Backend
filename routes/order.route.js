const express = require('express');
const { addOrder, getOrders, getOrder } = require('../controllers/order.controller');

const router = express.Router();

router.post('/', addOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);

module.exports = router;