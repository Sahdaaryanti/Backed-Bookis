const {Penerbit} = require('../models');

const getAllPenerbit = async (req, res) => {
  try {
    const allPenerbit = await Penerbit.findAll();
    res.json(allPenerbit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const getPenerbitById = async (req, res) => {
  const { id } = req.params;
  try {
    const penerbit = await Penerbit.findByPk(id);
    if (!penerbit) {
      return res.status(404).json({ status: 404, error: 'Penerbit not found' });
    }
    res.json(penerbit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const createPenerbit = async (req, res) => {
  const { nama } = req.body;
  try {
    const newPenerbit = await Penerbit.create({ nama });
    res.status(201).json(newPenerbit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const updatePenerbit = async (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;
  try {
    const penerbitToUpdate = await Penerbit.findByPk(id);
    if (!penerbitToUpdate) {
      return res.status(404).json({ status: 404, error: 'Penerbit not found' });
    }
    await penerbitToUpdate.update({ nama });
    res.json(penerbitToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

const deletePenerbit = async (req, res) => {
  const { id } = req.params;
  try {
    const penerbitToDelete = await Penerbit.findByPk(id);
    if (!penerbitToDelete) {
      return res.status(404).json({ status: 404, error: 'Penerbit not found' });
    }
    await penerbitToDelete.destroy();
    res.json({ message: 'Penerbit deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPenerbit,
  getPenerbitById,
  createPenerbit,
  updatePenerbit,
  deletePenerbit,
};