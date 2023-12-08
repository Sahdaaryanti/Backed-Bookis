const express = require('express');
const router = express.Router();
const detailPesananController = require('../controllers/riwayatPesanan');

// Endpoint untuk mendapatkan semua riwayat pesananAdmin
router.get('/admin', detailPesananController.getAllRiwayatPesananAdmin);

// Endpoint untuk mendapatkan semua riwayat pesanan Members
router.get('/members', detailPesananController.getAllRiwayatPesananMembers);

// Endpoint untuk mendapatkan detail pesanan berdasarkan ID
router.get('/admin/:id', detailPesananController.getDetailPesananById);

// Endpoint untuk mendapatkan detail pesanan berdasarkan ID
router.get('/members/:id', detailPesananController.getDetailPesananById);

// Endpoint untuk mengupdate status pesanan berdasarkan ID
router.put('/admin/:id', detailPesananController.updateStatusPesanan);



module.exports = router;