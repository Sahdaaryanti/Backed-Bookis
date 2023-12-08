const {Buku, Kategori, ulasanBuku, sequelize} = require('../models');
const {Op} = require('sequelize');

// Fungsi untuk menampilkan semua Buku
const getAllBuku = async (req, res) => {
  try {
    const allBuku = await Buku.findAll();
    res.json(allBuku);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

// Fungsi untuk menampilkan Buku berdasarkan ID
const getBukuById = async (req, res) => {
  const { id } = req.params;
  try {
    const bukuById = await Buku.findByPk(id);
    if (!bukuById) {
      return res.status(404).json({ status: 404, error: 'Buku not found' });
    }
    res.json(bukuById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

// Fungsi untuk membuat Buku baru
const createBuku = async (req, res) => {
  const { penulisId, penerbitId, kategoriId, judul, harga, isbn, tahunTerbit } = req.body;
  try {
    const newBuku = await Buku.create({ penulisId, penerbitId, kategoriId, judul, harga, isbn, tahunTerbit });
    res.status(201).json(newBuku);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

// Fungsi untuk memperbarui Buku berdasarkan ID
const updateBuku = async (req, res) => {
  const { id } = req.params;
  const { penulisId, penerbitId, kategoriId, judul, harga, isbn, tahunTerbit } = req.body;
  try {
    const BukuToUpdate = await Buku.findByPk(id);
    if (!BukuToUpdate) {
      return res.status(404).json({ status: 404, error: 'Buku not found' });
    }
    await BukuToUpdate.update({ penulisId, penerbitId, kategoriId, judul, harga, isbn, tahunTerbit });
    res.json(BukuToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

// Fungsi untuk menghapus Buku berdasarkan ID
const deleteBuku = async (req, res) => {
  const { id } = req.params;
  try {
    const BukuToDelete = await Buku.findByPk(id);
    if (!BukuToDelete) {
      return res.status(404).json({ status: 404, error: 'Buku not found' });
    }
    await BukuToDelete.destroy();
    res.json({ message: 'Buku deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

// Fungsi untuk mengambil Buku berdasarkan kategori
const getBukuByKategori = async (req, res, next) => {
  try {
    const nama = req.params.nama;

    // Log the category names from the database
    const categoriesFromDatabase = await Kategori.findAll();
    console.log('Categories from Database:', categoriesFromDatabase.map(category => category.nama));

    const booksByCategory = await Buku.findAll({
      include: [
        {
          model: Kategori,
          as: 'kategoris',
          where: {
            nama: nama,
          },
        },
      ],
      logging: console.log, 
    });

    console.log('Books by Category:', booksByCategory);

    if (booksByCategory.length === 0) {
      return res.status(404).json({ status: 404, error: 'Buku not found for the specified category' });
    }

    res.status(200).json({ status: 200, message: 'Success', data: booksByCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};

//fungsu mendapatkan buku populer berdasarkan rating
const getBukuPopuler = async (req, res) => {
  try {
    // Menggunakan SQL untuk mendapatkan buku populer berdasarkan rating
    const popularBooks = await Buku.findAll({
      include: [
        {
          model: ulasanBuku,
          as: 'ulasanBukus',
          where: sequelize.literal('"ulasanBukus"."rating" IS NOT NULL'), // Hanya ambil buku yang memiliki ulasan (rating tidak null)
        },
      ],
      order: [
        [
          sequelize.literal('(SELECT AVG("ulasanBukus"."rating") FROM "ulasanBukus" WHERE "ulasanBukus"."bukuId" = "Buku"."id")'),
          'DESC',
        ],
      ],
      limit: 30, // Ambil 30 buku terpopuler
    });

    res.status(200).json({ status: 200, message: 'Success', data: popularBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};

//fungsi mendapatkan buku terbaru
const getBukuTerbaru = async (req, res) => {
  try {
    // Menggunakan SQL untuk mendapatkan buku terbaru berdasarkan tanggal pembuatan
    const latestBooks = await Buku.findAll({
      order: [['createdAt', 'DESC']],
      limit: 30, // Ambil 10 buku terbaru
    });

    res.status(200).json({ status: 200, message: 'Success', data: latestBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  getAllBuku,
  getBukuById,
  createBuku,
  updateBuku,
  deleteBuku,
  getBukuByKategori,
  getBukuPopuler,
  getBukuTerbaru
};