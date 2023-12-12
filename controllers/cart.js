const { Cart, Buku } = require('../models');

// Get Cart Items
const getCart = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming userId is stored in the user object after authentication
    const cartItems = await Cart.findAll({
      where: { userid : userId },
      include: [{ model: Buku, as: 'bukus' }],
    });
    res.json({ status: 200, data: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

// Add Item to Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bukuId, jumlah } = req.body;
    
    // Check if the book exists
    const book = await Buku.findByPk(bukuId);
    if (!book) {
      return res.status(404).json({ status: 404, message: 'Book not found' });
    }

    // Create or update the cart item
    let cartItem = await Cart.findOne({ where: { userid:userId, bukuid:bukuId } });
    if (cartItem) {
      cartItem.jumlah += jumlah;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userid :userId, bukuid:book.id, jumlah });
    }

    res.json({ status: 200, data: cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

// Update Cart Item
const updateCartItem = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const { jumlah } = req.body;

    const cartItem = await Cart.findByPk(cartId);
    if (!cartItem) {
      return res.status(404).json({ status: 404, message: 'Cart item not found' });
    }

    cartItem.jumlah = jumlah;
    await cartItem.save();

    res.json({ status: 200, data: cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

// Remove Item from Cart
const removeCartItem = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    const cartItem = await Cart.findByPk(cartId);
    if (!cartItem) {
      return res.status(404).json({ status: 404, message: 'Cart item not found' });
    }

    await cartItem.destroy();

    res.json({ status: 200, message: 'Cart item removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};


const removeManyCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    // const da
  } catch (error) {
    
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
