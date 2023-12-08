const {Penulis} = require('../models');

const getAllPenulis = async (req, res) => {
  try {
    const allPenulis = await Penulis.findAll();
    res.json(allPenulis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const getPenulisById = async (req, res) => {
  const { id } = req.params;
  try {
    const penulis = await Penulis.findByPk(id);
    if (!penulis) {
      return res.status(404).json({ status: 404, error: 'Penulis not found' });
    }
    res.json(penulis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const createPenulis = async (req, res) => {
  const { nama } = req.body;
  try {
    const newPenulis = await Penulis.create({ nama });
    res.status(201).json(newPenulis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const updatePenulis = async (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;
  try {
    const penulisToUpdate = await Penulis.findByPk(id);
    if (!penulisToUpdate) {
      return res.status(404).json({ status: 404, error: 'Penulis not found' });
    }
    await penulisToUpdate.update({ nama });
    res.json(penulisToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const deletePenulis = async (req, res) => {
  const { id } = req.params;
  try {
    const penulisToDelete = await Penulis.findByPk(id);
    if (!penulisToDelete) {
      return res.status(404).json({ status: 404, error: 'Penulis not found' });
    }
    await penulisToDelete.destroy();
    res.json({ message: 'Penulis deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPenulis,
  getPenulisById,
  createPenulis,
  updatePenulis,
  deletePenulis,
};