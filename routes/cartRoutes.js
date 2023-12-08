const express = require('express');
const router = express.Router();
const { createCart,
    getAllCarts,
    updateCart,
    deleteCart, } = require('../controllers/cartController');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API for managing carts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         sessionid:
 *           type: integer
 *         bukuid:
 *           type: integer
 *         jumlah:
 *           type: integer
 *           description: The ID of the cart.
 *         # Add other properties here based on your model
 */

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *             
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Error
 *               error: Internal Server Error
 */
router.post('/carts', createCart);

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get all carts
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Returns a list of carts
 *         content:
 *           application/json:
 *             example: [{ seccsionid: 01, bukuid: 222, jumlah: 10 }]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Error
 *               error: Internal Server Error
 */
router.get('/carts', getAllCarts);

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Update a cart by ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Cart not found
 *               cartId: 1
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Error
 *               error: Internal Server Error
 */
router.put('/carts/:id', updateCart);

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Delete a cart by ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Cart not found
 *          
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Error
 *               error: Internal Server Error
 */
router.delete('/carts/:id', deleteCart);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const cartController = require('../controllers/cartController');


// router.post('/carts', cartController.createCart);
// router.get('/carts', cartController.getAllCarts);
// router.put('/carts/:id', cartController.updateCart);
// router.delete('/carts/:id', cartController.deleteCart);


// module.exports = router;