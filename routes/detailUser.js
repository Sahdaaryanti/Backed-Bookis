const express           = require('express');
const router            = express.Router();
const {  getAll, updatedetailUser, createDetailUser} = require('../controllers/detailUser');
// const {  login } = require('../controllers/user');
const { authentication,verifyRole }= require('../middlewares/auth');
const roleList  = require('../config/role')

/**
 * @swagger
 * /detail-user:
 *   get:
 *     summary: Get all admins
 *     tags: [Users]
 *     security:
 *       - MyAuth: []
 *     responses:
 *       200:
 *         description: Admins berhasil diambil!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error!
 */
// router.get('/', authentication, verifyRole(roleList.Admin), getAll);
// router.get('/',  authentication, verifyRole(roleList.Member), getAll);
// router.get('/detail/payment',  authentication, verifyRole(roleList.Member),userPaymentController.getAll);


/**
 * @swagger
 * /detail-user/create:
 *   post:
 *     summary: Create member's details
 *     tags: [DetailUser]
 *     security:
 *       - MyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: Member's details created successfully!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error!
 */
// router.post('/create', authentication, verifyRole(roleList.Member), createDetailUser);
// router.post('/create', authentication, verifyRole(roleList.Admin), createDetailUser);

/**
 * @swagger
 * /detail-user/{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Admin ID
 *         schema:
 *           type: integer
 *     security:
 *       - MyAuth: []
 *     responses:
 *       200:
 *         description: Admin berhasil diambil!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal Server Error!
 */
// router.get('/:id',  authentication, verifyRole(roleList.Admin), userController.getUserById);
// router.put('/edit/:id',  authentication, verifyRole(roleList.Admin), userController.updateUser);
// router.put('/:id', authentication, verifyRole(roleList.Admin), updatedetailUser);
// router.put('/:id', authentication, verifyRole(roleList.Member), updatedetailUser);
// router.put('/detail/edit-payment/:id', authentication, verifyRole(roleList.Member),userPaymentController.updatePayment);
// router.delete('/delete/:id',  authentication, verifyRole(roleList.Admin), userController.deleteUser);
// router.delete('/detail/delete-payment/:id', authentication, verifyRole(roleList.Member),userPaymentController.deletePayment);


//member
router.get('/',  authentication, verifyRole(roleList.Member), getAll);
router.post('/create', authentication, verifyRole(roleList.Member), createDetailUser);
router.put('/:id', authentication, verifyRole(roleList.Member), updatedetailUser);

//admin
// router.put('/:id', authentication, verifyRole(roleList.Admin), updatedetailUser);
// router.post('/create', authentication, verifyRole(roleList.Admin), createDetailUser);
// router.get('/', authentication, verifyRole(roleList.Admin), getAll);

module.exports = router;