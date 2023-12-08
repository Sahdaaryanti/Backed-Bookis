const express = require('express');
const router = express.Router();
const { getAllBuku,
    getBukuById,
    createBuku,
    updateBuku,
    deleteBuku,
    getBukuByKategori,
    getBukuPopuler,
    getBukuTerbaru } = require('../controllers/Bukus');
const { authentication } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Buku
 *   description: Manajemen Buku
 */

/**
 * @swagger
 * /buku:
 *   post:
 *     summary: Menambahkan buku baru (hanya admin)
 *     tags: [Buku]
 *     security:
 *       - MyAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               penulisId:
 *                 type: integer
 *               penerbitId:
 *                 type: integer
 *               kategoriId:
 *                 type: integer
 *               judul:
 *                 type: string
 *               harga:
 *                 type: decimal
 *               isbn:
 *                 type: string
 *               tahunTerbit:
 *                 type: string
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Tidak diizinkan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.post('/', authentication, createBuku);

/**
 * @swagger
 * /buku/{id}:
 *   put:
 *     summary: Mengedit buku berdasarkan ID (hanya admin)
 *     tags: [Buku]
 *     security:
 *       - MyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Buku
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               penulisId:
 *                 type: integer
 *               penerbitId:
 *                 type: integer
 *               kategoriId:
 *                 type: integer
 *               judul:
 *                 type: string
 *               harga:
 *                 type: number
 *               isbn:
 *                 type: string
 *               tahunTerbit:
 *                 type: string
 *     responses:
 *       200:
 *         description: Buku berhasil diperbarui
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Tidak diizinkan
 *       404:
 *         description: Buku tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.put('/:id', authentication, updateBuku);

/**
 * @swagger
 * /buku/{id}:
 *   delete:
 *     summary: Menghapus buku berdasarkan ID (hanya admin)
 *     tags: [Buku]
 *     security:
 *       - MyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Buku
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *       401:
 *         description: Tidak diizinkan
 *       404:
 *         description: Buku tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.delete('/:id', authentication, deleteBuku);

/**
 * @swagger
 * /buku/populer:
 *   get:
 *     summary: Mendapatkan buku terbaru
 *     tags: [Buku]
 *     responses:
 *       200:
 *         description: Sukses
 *       500:
 *         description: Kesalahan Server Internal
 */
router.get('/populer', getBukuPopuler);

/**
 * @swagger
 * /buku/recommended:
 *   get:
 *     summary: Mendapatkan buku rekomendasi
 *     tags: [Buku]
 *     responses:
 *       200:
 *         description: Sukses
 *       500:
 *         description: Kesalahan Server Internal
 */
router.get('/recommended', getBukuTerbaru);

/**
 * @swagger
 * /buku:
 *   get:
 *     summary: Mendapatkan semua buku
 *     tags: [Buku]
 *     responses:
 *       200:
 *         description: Sukses
 *       500:
 *         description: Kesalahan Server Internal
 */
router.get('/', getAllBuku);

/**
 * @swagger
 * /buku/{id}:
 *   get:
 *     summary: Mendapatkan buku berdasarkan ID
 *     tags: [Buku]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Buku
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sukses
 *       404:
 *         description: Buku tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.get('/:id', getBukuById);

/**
 * @swagger
 * /buku/kategori/{nama}:
 *   get:
 *     summary: Mendapatkan buku berdasarkan kategori
 *     tags: [Buku]
 *     parameters:
 *       - in: path
 *         name: nama
 *         required: true
 *         description: Nama kategori
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sukses
 *       404:
 *         description: Buku tidak ditemukan untuk kategori yang spesifik
 *       500:
 *         description: Kesalahan Server Internal
 */
router.get('/kategori/:nama', getBukuByKategori);

module.exports = router;
