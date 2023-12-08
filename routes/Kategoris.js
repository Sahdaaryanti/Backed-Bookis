const express = require('express');
const router = express.Router();
const { getAllKategoris, getKategorisById, createKategoris, updateKategoris, deleteKategoris } = require('../controllers/Kategoris');
const { authentication } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Kategori
 *   description: Manajemen Kategori
 */

/**
 * @swagger
 * /kategori:
 *   get:
 *     summary: Mendapatkan semua kategori
 *     tags: [Kategori]
 *     responses:
 *       200:
 *         description: Sukses
 *       500:
 *         description: Kesalahan Server Internal
 */
router.get('/', getAllKategoris);

/**
 * @swagger
 * /kategori/{id}:
 *   get:
 *     summary: Mendapatkan kategori berdasarkan ID
 *     tags: [Kategori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Kategori
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sukses
 *       404:
 *         description: Kategori tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.get('/:id', getKategorisById);

/**
 * @swagger
 * /kategori:
 *   post:
 *     summary: Menambahkan kategori baru (hanya admin)
 *     tags: [Kategori]
 *     security:
 *       - MyAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kategori berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Tidak diizinkan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.post('/', authentication, createKategoris);

/**
 * @swagger
 * /kategori/{id}:
 *   put:
 *     summary: Mengedit kategori berdasarkan ID (hanya admin)
 *     tags: [Kategori]
 *     security:
 *       - MyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Kategori
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kategori berhasil diperbarui
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Tidak diizinkan
 *       404:
 *         description: Kategori tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.put('/:id', authentication, updateKategoris);

/**
 * @swagger
 * /kategori/{id}:
 *   delete:
 *     summary: Menghapus kategori berdasarkan ID (hanya admin)
 *     tags: [Kategori]
 *     security:
 *       - MyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Kategori
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 *       401:
 *         description: Tidak diizinkan
 *       404:
 *         description: Kategori tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.delete('/:id', authentication, deleteKategoris);

module.exports = router;
