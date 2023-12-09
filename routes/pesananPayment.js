const express = require('express');
const router = express.Router();
const {createPesananPayment,getPesananPaymentById, updatePesananPayment, deletePesananPayment} = require('../controllers/pesananPayment');
const { authentication } = require('../middlewares/auth');

router.post('/pesananPayment',authentication, createPesananPayment);
router.get('/pesananPayment/:id',authentication, getPesananPaymentById);
router.put('/pesananPayment/:id',authentication, updatePesananPayment);
router.delete('/pesananPayment/:id',authentication, deletePesananPayment);

module.exports = router;
