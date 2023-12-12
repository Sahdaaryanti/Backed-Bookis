const { midtransConfig, pool } = require('../config/config.json')['development'];
const { userPayment, detailUser,detailPesanan } = require('../models');

const Snap = require('midtrans-client').Snap;
const snap = new Snap({
  isProduction: false, // Set to true for production
  clientKey : "SB-Mid-client-i7EYrt8-ISPqtLd1",
  serverKey:  "SB-Mid-server-KChFbiCMuFt9ZU284Fr7_ob9",
});
// Function to initiate payment
const createPayment = async (req, res, next) => {
  try {
    const { detailUserId,provider,totalPrice } = req.body;

    // Validate if detailUser exists
    const existingDetailUser = await detailUser.findByPk(detailUserId);
    if (!existingDetailUser) {
      return res.status(404).json({ status: 404, error: 'DetailUser not found' });
    }

    // Generate payment token using Midtrans Snap API
    const paymentToken = await generatePaymentToken(totalPrice,detailUserId);

    // Save payment details in the database
    const payment = await userPayment.create({
      id : paymentToken[1],
      detailUserId,
      provider,
      noPayment : paymentToken[0],
    });

    await detailPesanan.create({
      userId : detailUserId,
      total : totalPrice,
      statusPesanan : "Baru",
      createdAt : new Date(),
      updatedAt : new Date()
    })


    res.status(200).json({ status: 200, paymentToken : paymentToken[0], payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      error: 'Payment failed. Please try again.',
      sequelizeError: error.errors || error, // Menambahkan informasi kesalahan Sequelize
    });
  }
};

// Function to generate payment token using Midtrans Snap API
const generatePaymentToken = async (totalPrice,userid) => {

  // Set your server key from Midtrans


  const parameter = {
    transaction_details: {
      order_id: `ORDER-${userid}-${Date.now()}`,
      gross_amount: totalPrice, // Set the amount based on your requirement
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      email: 'customer@example.com', // Set the customer's email
      first_name: 'John',
      last_name: 'Doe',
      phone: '08123456789',
    },
  };

  try {
    const paymentToken = await snap.createTransactionToken(parameter);
    return [paymentToken,parameter.transaction_details.order_id];
  } catch (error) {
    throw new Error(`Failed to generate payment token: ${error.message}`);
  }
};

const getStatusPayment = async(req,res,next) => {
  try {
    const { detailUserId } = req.params;
    console.log(detailUserId)
    const existingDetailUser = await detailUser.findByPk(detailUserId);
    if (!existingDetailUser) {
      return res.status(404).json({ status: 404, error: 'DetailUser not found' });
    }

    const payments = await userPayment.findAll({ where: { detailUserId } });  
    const paymentStatusPromises = payments.map(async (payment) => {
      try {
        const response = await snap.transaction.status(payment.id);
        return { payment, status: response };
      } catch (error) {
        console.error(`Error fetching status for transaction ${payment.id}:`, error);
        return { payment, status: 'error' };
      }
    });

    // Wait for all status requests to complete
    const paymentStatusResults = await Promise.all(paymentStatusPromises);

    res.status(200).json({ status: 200, paymentStatusResults });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPayment,
  getStatusPayment
};

