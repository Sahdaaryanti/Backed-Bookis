const express = require('express');
const cartRoute = express.Router();
const {getCart, addToCart, updateCartItem, removeCartItem,} = require('../controllers/cart');
const { authentication, verifyRole } = require('../middlewares/auth');

// Get Cart Items
cartRoute.get('/cart', authentication, verifyRole(['member']), getCart);

// Add Item to Cart
cartRoute.post('/cart/add', authentication, verifyRole(['member']), addToCart);

// Update Cart Item
cartRoute.put('/cart/update/:cartId', authentication, verifyRole(['member']), updateCartItem);

// Remove Item from Cart
cartRoute.delete('/cart/remove/:cartId', authentication, verifyRole(['member']), removeCartItem);

module.exports = cartRoute;