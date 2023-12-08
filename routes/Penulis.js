const express = require('express');
const router = express.Router();
const { getAllPenulis, getPenulisById, createPenulis, updatePenulis, deletePenulis } = require('../controllers/Penulis');
const { authentication } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Penulis
 *   description: Manajemen Penulis
 */

/**
 * @swagger
 * /penulis:
 *   get:
 *     summary: Mendapatkan semua penulis
 *     tags: [Penulis]
 *     responses:
 *       200:
 *         description: Sukses
 *       500:
 *         description: Kesalahan Server Internal
 */
router.get('/', getAllPenulis);

/**
 * @swagger
 * /penulis/{id}:
 *   get:
 *     summary: Mendapatkan penulis berdasarkan ID
 *     tags: [Penulis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Penulis
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sukses
 *       404:
 *         description: Penulis tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.get('/:id', getPenulisById);

/**
 * @swagger
 * /penulis:
 *   post:
 *     summary: Menambahkan penulis baru (hanya admin)
 *     tags: [Penulis]
 *     security:
 *       - MyAuth: []
 *     requestBody:
 *       content:
 *        multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *     responses:
 *       201:
 *         description: Penulis berhasil ditambahkan
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Tidak diizinkan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.post('/', authentication, createPenulis);

/**
 * @swagger
 * /penulis/{id}:
 *   put:
 *     summary: Mengedit penulis berdasarkan ID (hanya admin)
 *     tags: [Penulis]
 *     security:
 *       - MyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Penulis
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
 *     responses:
 *       200:
 *         description: Penulis berhasil diperbarui
 *       400:
 *         description: Data tidak valid
 *       401:
 *         description: Tidak diizinkan
 *       404:
 *         description: Penulis tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.put('/:id', authentication, updatePenulis);

/**
 * @swagger
 * /penulis/{id}:
 *   delete:
 *     summary: Menghapus penulis berdasarkan ID (hanya admin)
 *     tags: [Penulis]
 *     security:
 *       - MyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Penulis
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Penulis berhasil dihapus
 *       401:
 *         description: Tidak diizinkan
 *       404:
 *         description: Penulis tidak ditemukan
 *       500:
 *         description: Kesalahan Server Internal
 */
router.delete('/:id', authentication, deletePenulis);

module.exports = router;
