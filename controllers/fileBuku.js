const { fileBuku } = require('../models');

const createFileBuku = async (req, res) => {
  try {
    const { bukuId } = req.body;
const urlFile = req.file ? req.file.path : undefined;

    // Pastikan bukuId dan urlFile tersedia
    if (!bukuId || !urlFile) {
      return res.status(400).json({ error: 'BukuId dan urlFile harus diisi' });
    }

    // Buat file buku baru
    const newFileBuku = await fileBuku.create({
      bukuId,
      urlFile,
    });

    return res.status(201).json(newFileBuku);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateFileBuku = async (req, res) => {
  try {
    const { id } = req.params;
    const { bukuId } = req.body;
    const urlFile = req.file ? req.file.path : undefined;

    // Pastikan id, bukuId, dan urlFile tersedia
    if (!id || !bukuId || !urlFile) {
      return res.status(400).json({ error: 'ID, bukuId, dan urlFile harus diisi' });
    }

    // Perbarui file buku berdasarkan id
    const updatedFileBuku = await fileBuku.update(
      {
        bukuId,
        urlFile,
      },
      {
        where: { id },
      }
    );

    // Periksa apakah file buku dengan id tersebut ditemukan
    if (updatedFileBuku[0] === 0) {
      return res.status(404).json({ error: 'File buku tidak ditemukan' });
    }

    return res.status(200).json({ message: 'File buku berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllFileBuku = async (req, res) => {
  try {
    // Ambil semua file buku dari database
    const allFileBuku = await fileBuku.findAll();

    return res.status(200).json(allFileBuku);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createFileBuku,
  updateFileBuku,
  getAllFileBuku
};