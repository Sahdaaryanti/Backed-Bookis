const { Gudang } = require('../models');

// Get all stocks
const getAllStocks = async (req, res) => {
  try {
    const allStock = await Gudang.findAll();
    res.json(allStock);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  }
};

// Add stock for a book
const addStock = async (req, res) => {
  try {
    const { bukuId, stok } = req.body;
    const stock = await Gudang.create({ bukuId, stok });
    res.status(201).json({ status: 201, data: stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

// Update stock for a book
const updateStock = async (req, res) => {
  const { gudangId } = req.params;
  const { stok } = req.body;

  try {
    const stock = await Gudang.findByPk(gudangId);

    if (!stock) {
      return res.status(404).json({ status: 404, message: 'Stock not found' });
    }

    stock.stok = stok;
    await stock.save();

    res.status(200).json({ status: 200, data: stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

// Delete stock for a book
const deleteStock = async (req, res) => {
  const { gudangId } = req.params;

  try {
    const stock = await Gudang.findByPk(gudangId);

    if (!stock) {
      return res.status(404).json({ status: 404, message: 'Stock not found' });
    }

    await stock.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllStocks,
  addStock,
  updateStock,
  deleteStock,
};
