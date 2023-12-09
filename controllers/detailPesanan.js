const { detailPesanan } = require('../models');

// Create
const createDetailPesanan = async (req, res) => {
  try {
    const newDetailPesanan = await detailPesanan.create(req.body);
    res.json(newDetailPesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Read
const getDetailPesananById = async (req, res) => {
  try {
    const detailPesananData = await detailPesanan.findByPk(req.params.id);
    res.json(detailPesananData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update
const updateDetailPesanan = async (req, res) => {
  try {
    const updatedDetailPesanan = await detailPesanan.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedDetailPesanan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete
const deleteDetailPesanan = async (req, res) => {
  try {
    await detailPesanan.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: 'Detail Pesanan deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    createDetailPesanan,
    getDetailPesananById,
    updateDetailPesanan,
    deleteDetailPesanan
}
