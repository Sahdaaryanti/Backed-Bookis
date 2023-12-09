const express = require('express');
const router = express.Router();
const {createDetailPesanan, deleteDetailPesanan, getDetailPesananById, updateDetailPesanan} = require('../controllers/detailPesanan');
const { authentication } = require('../middlewares/auth');

router.post('/detailPesanan',authentication, createDetailPesanan);
router.get('/detailPesanan/:id',authentication, getDetailPesananById);
router.put('/detailPesanan/:id',authentication, updateDetailPesanan);
router.delete('/detailPesanan/:id',authentication , deleteDetailPesanan);

module.exports = router;
