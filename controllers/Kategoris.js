const {Kategori} = require('../models');

const getAllKategoris = async (req, res) => {
  try {
    const allKategoris = await Kategori.findAll();
    res.json(allKategoris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const getKategorisById = async (req, res) => {
  const { id } = req.params;
  try {
    const Kategoris = await Kategori.findByPk(id);
    if (!Kategoris) {
      return res.status(404).json({ status: 404, error: 'Kategoris not found' });
    }
    res.json(Kategoris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const createKategoris = async (req, res) => {
  const { nama, deskripsi } = req.body;
  try {
    const newKategoris = await Kategori.create({ nama, deskripsi });
    res.status(201).json(newKategoris);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const updateKategoris = async (req, res) => {
  const { id } = req.params;
  const { nama, deskripsi } = req.body;
  try {
    const KategorisToUpdate = await Kategori.findByPk(id);
    if (!KategorisToUpdate) {
      return res.status(404).json({ status: 404, error: 'Kategoris not found' });
    }
    await KategorisToUpdate.update({ nama, deskripsi });
    res.json(KategorisToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const deleteKategoris = async (req, res) => {
  const { id } = req.params;
  try {
    const KategorisToDelete = await Kategori.findByPk(id);
    if (!KategorisToDelete) {
      return res.status(404).json({ status: 404, error: 'Kategoris not found' });
    }
    await KategorisToDelete.destroy();
    res.json({ message: 'Kategoris deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllKategoris,
  getKategorisById,
  createKategoris,
  updateKategoris,
  deleteKategoris,
};