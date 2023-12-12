const express       = require('express')
const router        = express.Router()
const path          = require('path')

/** Inisialisasi disini router kalian */
const userRoute = require('./user');
const detailUserRoute = require('./detailUser');
const bukuRoute = require('./Bukus');
const fileBukuRoute = require('./fileBuku');
const gudangRoute = require('.//gudang');
const cartRoute = require('./cart');
const kategoriRoute = require('./Kategoris');
const penerbitRoute = require('./Penerbits');
const penulisRoute = require('./Penulis');
const ulasanBukuRoute = require('./ulasanBuku');
const paymentBukuRoute = require('./userPayment');
const pesananPaymentRoute = require('./pesananPayment');
const riwayatPesananRoute = require('./riwayatPesanan');
const cartRoutes = require('./cart')

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});


router.use('/user', userRoute);
// router.use('/my-account', userRoute)
router.use('/detail-user', detailUserRoute);
router.use('/buku', bukuRoute);
router.use('/file-buku', fileBukuRoute);
router.use('/stok', gudangRoute);
router.use('/keranjang', cartRoute);
router.use('/kategori', kategoriRoute);
router.use('/penerbit', penerbitRoute);
router.use('/penulis', penulisRoute);
router.use('/ulasanBuku', ulasanBukuRoute);
router.use('/payment', paymentBukuRoute);
router.use('/riwayat-pesanan',riwayatPesananRoute); 
router.use('/users',pesananPaymentRoute) 
router.use('/cart', cartRoute)

module.exports = router