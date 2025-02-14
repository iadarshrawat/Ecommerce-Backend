const express = require('express');
const {createProduct, getProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/product.controllers');
const { isAdmin, isAuth } = require('../controllers/auth.controller');

const router = express.Router();


router.post('/', isAuth, isAdmin ,createProduct)
router.get('/', getProducts)
router.get('/:id', getProduct)
router.put('/:id', isAuth, isAdmin ,updateProduct)
router.delete('/:id', isAuth, isAdmin ,deleteProduct)

module.exports = router;