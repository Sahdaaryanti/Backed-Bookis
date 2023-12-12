const express = require('express');
const router = express.Router();
const detailPesananController = require('../controllers/riwayatPesanan');
const { authentication } = require('../middlewares/auth');

// Endpoint untuk mendapatkan semua riwayat pesananAdmin
router.get('/admin', authentication, detailPesananController.getAllRiwayatPesananAdmin);

// Endpoint untuk mendapatkan semua riwayat pesanan Members
router.get('/members',  authentication, detailPesananController.getAllRiwayatPesananMembers);

// Endpoint untuk mendapatkan detail pesanan berdasarkan ID
router.get('/admin/:id', authentication, detailPesananController.getDetailPesananById);

// Endpoint untuk mendapatkan detail pesanan berdasarkan ID
router.get('/members/:id', authentication, detailPesananController.getDetailPesananById);

// Endpoint untuk mengupdate status pesanan berdasarkan ID
router.put('/admin/:id', authentication, detailPesananController.updateStatusPesanan);



module.exports = router;