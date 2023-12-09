const express = require('express');
const router = express.Router();
const {createCartItem, getCartItemById, updateCartItem, deleteCartItem,} = require('../controllers/cart');
const { authentication } = require('../middlewares/auth');

router.post('/cart',authentication, createCartItem);
router.get('/cart/:id',authentication, getCartItemById);
router.put('/cart/:id',authentication, updateCartItem);
router.delete('/cart/:id',authentication, deleteCartItem);

module.exports = router;
