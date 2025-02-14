const express = require('express');
const { processPayment } = require('../controllers/payment.controller');

const router = express.Router();

router.post('/', processPayment);

module.exports = router;