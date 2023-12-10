const express = require('express');
const router = express.Router();
const { createFileBuku, updateFileBuku, getAllFileBuku, deleteFileBuku } = require('../controllers/fileBuku');
const upload = require("../middlewares/multer");
const { authentication, verifyRole } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: File Buku
 *   description: Manajemen File Buku
 */

/**
 * @swagger
 * /file-buku:
 *   post:
 *     summary: Menambahkan file buku baru
 *     tags: [File Buku]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bukuId:
 *                 type: integer
 *               urlFile:
 *                 type: string
 *     responses:
 *       201:
 *         description: File buku berhasil ditambahkan
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/',authentication, upload.single('urlFile'),verifyRole(['admin']), createFileBuku);

/**
 * @swagger
 * /file-buku/{id}:
 *   put:
 *     summary: Memperbarui file buku berdasarkan ID
 *     tags: [File Buku]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID file buku
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bukuId:
 *                 type: integer
 *               urlFile:
 *                 type: string
 *     responses:
 *       200:
 *         description: File buku berhasil diperbarui
 *       400:
 *         description: Bad Request
 *       404:
 *         description: File buku tidak ditemukan
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', authentication, upload.single('urlFile'),verifyRole(['admin']), updateFileBuku);

/**
 * @swagger
 * /file-buku/all:
 *   get:
 *     summary: Mendapatkan semua file buku
 *     tags: [File Buku]
 *     responses:
 *       200:
 *         description: File buku berhasil diambil
 *       500:
 *         description: Internal Server Error
 */
router.get('/all', getAllFileBuku);

/**
 * @swagger
 * /file-buku/{id}:
 *   delete:
 *     summary: Menghapus file buku berdasarkan ID
 *     tags: [File Buku]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID file buku
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File buku berhasil dihapus
 *       400:
 *         description: Bad Request
 *       404:
 *         description: File buku tidak ditemukan
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id',authentication,verifyRole(['admin']), deleteFileBuku);

module.exports = router;