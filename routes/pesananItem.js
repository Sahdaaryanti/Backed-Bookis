const express = require('express');
const router = express.Router();
const {createPesananItem, getPesananItemById, updatePesananItem, deletePesananItem} = require('../controllers/pesananItem');
const { authentication } = require('../middlewares/auth');

router.post('/pesananItem',authentication, createPesananItem);
router.get('/pesananItem/:id',authentication, getPesananItemById);
router.put('/pesananItem/:id',authentication, updatePesananItem);
router.delete('/pesananItem/:id',authentication, deletePesananItem);

module.exports = router;
