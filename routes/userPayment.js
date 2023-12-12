const express = require('express');
const router = express.Router();
const createPayment = require('../controllers/userPayment');


/**
 * @swagger
 * /payment/buku:
 *   post:
 *     summary: Create a new payment
 *     description: Endpoint to create a new payment.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *               noPayment:
 *                 type: string
 *               detailUserId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Successful payment creation
 *         content:
 *           application/json:
 *             example:
 *               message: Payment created successfully
 *       '400':
 *         description: Bad Request. Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid input data
 *       '500':
 *         description: Internal Server Error. Failed to create payment.
 *         content:
 *           application/json:
 *             example:
 *               error: Failed to create payment
 */

// ... (routes and other Swagger definitions)

router.post('/buku', createPayment.createPayment);
router.get('/user/:detailUserId', createPayment.getStatusPayment);

module.exports = router;