//const { detailPesanan } = require('../models');
/**
 * @swagger
 * tags:
 *   name: Riwayat Pesanan
 *   description: Endpoints untuk mengelola riwayat pesanan
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PesananItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         bukuId:
 *           type: integer
 *         jumlah:
 *           type: integer
 * 
 *     PesananPayment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         pesananId:
 *           type: integer
 *         provider:
 *           type: string
 *         statusBayar:
 *           type: string
 *           enum: ['Sudah Dibayar', 'Belum Dibayar']
 * 
 *     DetailPesanan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: string
 *         total:
 *           type: number
 *         statusPesanan:
 *           type: string
 *           enum: ['Baru', 'Proses Packing', 'Dikirim', 'Dibatalkan']
 *         pesananItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PesananItem'
 *         pesananPayments:
 *           type: array
 *           items: 
 *             $ref: '#/components/schemas/PesananPayment'
 */

/**
 * @swagger
 * /riwayat-pesanan-members:
 *   get:
 *     summary: Mendapatkan riwayat pesanan pengguna tertentu
 *     tags: [Riwayat Pesanan]
 *     responses:
 *       200:
 *         description: Sukses mendapatkan riwayat pesanan pengguna tertentu
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetailPesanan'
 *       500:
 *         description: Kesalahan server

 * /riwayat-pesanan:
 *   get:
 *     summary: Mendapatkan semua riwayat pesanan (Admin)
 *     tags: [Riwayat Pesanan]
 *     responses:
 *       200:
 *         description: Sukses mendapatkan semua riwayat pesanan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetailPesanan'
 *       500:
 *         description: Kesalahan server

 * /riwayat-pesanan/{id}:
 *   get:
 *     summary: Mendapatkan riwayat pesanan berdasarkan ID
 *     tags: [Riwayat Pesanan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID riwayat pesanan
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sukses mendapatkan riwayat pesanan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetailPesanan'
 *       404:
 *         description: Riwayat pesanan tidak ditemukan
 *       500:
 *         description: Kesalahan server

 *   put:
 *     summary: Memperbarui status pesanan berdasarkan ID
 *     tags: [Riwayat Pesanan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID riwayat pesanan
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               statusPesanan:
 *                 type: string
 *                 enum: ['Baru', 'Proses Packing', 'Dikirim', 'Dibatalkan']
 *     responses:
 *       200:
 *         description: Status pesanan berhasil diperbarui
 *       400:
 *         description: Permintaan tidak valid
 *       404:
 *         description: Detail pesanan tidak ditemukan
 *       500:
 *         description: Kesalahan server
 */





const { response } = require('express');
const { detailPesanan, pesananItem, pesananPayment, Buku, User, detailUser,userPayment, fileBuku } = require('../models');
const Snap = require('midtrans-client').Snap;
const snap = new Snap({
  isProduction: false, // Set to true for production
  clientKey : "SB-Mid-client-1CHFlkgibw5_iOsq",
  serverKey:  "SB-Mid-server-VFMYXvWVa2vxkW9M7RUhgmrh",
});

exports.getAllRiwayatPesananMembers = async (req, res) => {
  try {
    
    const userId = req.user.userId


    // const riwayatPesanan = await detailPesanan.findAll({
    //   where: { userId: userId }, 
    //   include: [
    //     { 
    //       model: pesananItem, 
    //       as: 'pesananItems',
    //       include: [{ 
    //         model: Buku, 
    //         as: 'bukus', 
    //         include: [{ model: fileBuku, as: 'fileBukus' }],
    //       },
          
    //     ],
    //     },
    //   ],
    // });

    const data = await userPayment.findAll({
      where : {detailUserId : userId},
    })


    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

exports.getAllRiwayatPesananAdmin = async (req, res) => {
  try {
    const riwayatPesanan = await detailPesanan.findAll({
      include: [
        { 
          model: pesananItem, 
          as: 'pesananItems',
          include: [{ model: Buku, as: 'bukus', 
          include: [{ model: fileBuku, as: 'fileBukus' }],},],
         },
         {
          model: User,
          as: 'users',
          include: [{ model: detailUser, as: 'detailUsers' }],
        },
        
    
      ],
    });
    res.json(riwayatPesanan);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};


exports.getDetailPesananById = async (req, res) => {
  try {
    const riwayatPesanan = await detailPesanan.findByPk(req.params.id, {
      include: [
        { model: pesananItem, as: 'pesananItems', 
        include: [{ model: Buku, as: 'bukus',
        include: [{ model: fileBuku, as: 'fileBukus' }]}], },
        { model: pesananPayment, as: 'pesananPayments' },
        {
          model: User,
          as: 'users',
          include: [{ model: detailUser, as: 'detailUsers' }],
        },
        
      ],
    });

    if (!riwayatPesanan) {
      res.status(404).json({ status: 404, message: 'Pesanan tidak ditemukan' });
      return;
    }

    res.json(riwayatPesanan);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

exports.updateStatusPesanan = async (req, res) => {
    try {
      const pesananId = req.params.id;
      
      
      if (!req.body || typeof req.body !== 'object' || !req.body.statusPesanan) {
        return res.status(400).json({ status: 400, message: 'Status pesanan tidak tersedia dalam permintaan' });
      }
  
      const { statusPesanan } = req.body;
  
      
      const updatedDetailPesanan = await detailPesanan.update(
        { statusPesanan: statusPesanan },
        { where: { id: pesananId } }
      );
  
      if (updatedDetailPesanan[0] === 0) {
        return res.status(404).json({ status: 404, message: 'Detail pesanan tidak ditemukan' });
      }
  
      res.json({ message: 'Status pesanan berhasil diperbarui' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui status pesanan' });
    }
  };