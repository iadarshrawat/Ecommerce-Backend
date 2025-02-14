const express = require('express');
const { register, login, profile, isAuth } = require('../controllers/auth.controller');
const { addCart, getCart, updateCart, removeCartItem } = require('../controllers/cart.controller');

const router = express.Router();

router.post('/', isAuth ,addCart)
router.get('/', getCart)
router.put('/:id', isAuth ,updateCart)
router.delete('/:id', isAuth ,removeCartItem)


module.exports = router;