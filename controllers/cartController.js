const { cart } = require('../models');

const createCart = async (req, res) => {
  try {
    const cartData = {
      ...req.body,
      productName: req.body.productName,
      price: req.body.price,
      total: req.body.jumlah * req.body.price,
    };

    const newCart = await cart.create(cartData);
    return res.status(201).json({
      status: 200,
      message: 'Success',
      data: {
         newCart, cartData
      },
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error', error: error.message });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const allCarts = await cart.findAll();
    return res.status(200).json(allCarts);
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error', error: error.message });
  }
};

const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await cart.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedCart = await cart.findByPk(id);
      return res.status(200).json({status: 200, message: 'Success', data: updatedCart});
    }
    return res.status(404).json({ status: 404, message: 'Cart not found', cartId: id });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error', error: error.message });
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cart.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ status: 404, message: 'Cart not found', data: null });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error', error: error.message });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  updateCart,
  deleteCart,
};