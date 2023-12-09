const { pesananItem } = require('../models');

// Create
const createPesananItem = async (req, res) => {
  try {
    const newPesananItem = await pesananItem.create(req.body);
    res.json(newPesananItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Read
const getPesananItemById = async (req, res) => {
  try {
    const pesananItemData = await pesananItem.findByPk(req.params.id);
    res.json(pesananItemData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update
const updatePesananItem = async (req, res) => {
  try {
    const updatedPesananItem = await pesananItem.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedPesananItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete
const deletePesananItem = async (req, res) => {
  try {
    await pesananItem.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: 'Pesanan Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    createPesananItem,
    getPesananItemById,
    updatePesananItem,
    deletePesananItem,
  };