// routes/UlasanBukuRoutes.js

const express = require('express');
const router = express.Router();
const { getAllUlasan, createUlasan } = require('../controllers/ulasanBuku');

/**
 * @swagger
 * tags:
 *   name: UlasanBuku
 *   description: Manajemen Ulasan Buku
 */

/**
 * @swagger
 * /ulasanBuku:
 *   get:
 *     summary: Mendapatkan semua ulasan buku
 *     tags: [UlasanBuku]
 *     responses:
 *       200:
 *         description: Sukses
 *       500:
 *         description: Kesalahan Server Internal
 */
router.get('/', getAllUlasan);

/**
 * @swagger
 * /ulasanBuku:
 *   post:
 *     summary: Menambahkan ulasan buku (hanya untuk member)
 *     tags: [UlasanBuku]
 *     security:
 *       - MyAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bukuId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               komentar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ulasan berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Tidak diizinkan
 *       404:
 *         description: Buku tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.post('/', createUlasan);

module.exports = router;
