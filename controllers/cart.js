const { cart } = require('../models');

// Create
const createCartItem = async (req, res) => {
  try {
    const newCartItem = await cart.create(req.body);
    res.json(newCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Read
const getCartItemById = async (req, res) => {
  try {
    const cartItemData = await cart.findByPk(req.params.id);
    res.json(cartItemData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update
const updateCartItem = async (req, res) => {
  try {
    const updatedCartItem = await cart.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete
const deleteCartItem = async (req, res) => {
  try {
    await cart.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: 'Cart Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCartItem,
  getCartItemById,
  updateCartItem,
  deleteCartItem
}
