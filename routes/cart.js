const express = require('express');
const router = express.Router();
const {getCart, addToCart, updateCartItem, removeCartItem,} = require('../controllers/cart');
const { authentication, verifyRole } = require('../middlewares/auth');

// Get Cart Items
router.get('/cart', authentication, verifyRole(['member']), getCart);

// Add Item to Cart
router.post('/cart/add', authentication, verifyRole(['member']), addToCart);

// Update Cart Item
router.put('/cart/update/:cartId', authentication, verifyRole(['member']), updateCartItem);

// Remove Item from Cart
router.delete('/cart/remove/:cartId', authentication, verifyRole(['member']), removeCartItem);

module.exports = router;
