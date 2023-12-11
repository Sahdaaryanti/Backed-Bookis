const express = require('express');
const router = express.Router();
const { createFileBuku, updateFileBuku, getAllFileBuku } = require('../controllers/fileBuku');
const {authentication, verifyRole} = require('../middlewares/auth')
const upload = require("../middlewares/multer");

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
router.post('/',authentication, verifyRole(['admin']), upload.single('urlFile'), createFileBuku);

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
router.put('/:id',upload.single('urlFile'), updateFileBuku);

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

module.exports = router;