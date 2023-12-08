const express = require('express');
const router = express.Router();
const { authentication, verifyRole } = require('../middlewares/auth'); // Assuming you have authentication middleware

const {
  getAllStocks,
  addStock,
  updateStock,
  deleteStock,
} = require('../controllers/gudang');

// Get all books with stock information
router.get('/buku', authentication, verifyRole(['admin']), getAllStocks);
router.post('/buku', authentication, verifyRole(['admin']), addStock);
router.put('/buku/:gudangId', authentication, verifyRole(['admin']), updateStock);
router.delete('/buku/:gudangId', authentication, verifyRole(['admin']), deleteStock);

module.exports = router;