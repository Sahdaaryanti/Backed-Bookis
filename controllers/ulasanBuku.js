const { ulasanBuku, Buku } = require('../models');

const getAllUlasan = async (req, res) => {
  try {
    const ulasan = await ulasanBuku.findAll();
    res.json(ulasan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const createUlasan = async (req, res) => {
  const { bukuId, rating, komentar } = req.body;
  try {
    const buku = await Buku.findByPk(bukuId);
    if (!buku) {
      return res.status(404).json({ status: 404, error: 'Buku not found' });
    }

    const ulasan = await ulasanBuku.create({ bukuId, rating, komentar });
    res.status(201).json(ulasan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllUlasan,
  createUlasan,
};