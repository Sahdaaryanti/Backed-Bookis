// const { detailUser, UserPayment } = require('../models');
// const { midtransConfig } = require('../config/dbConfig');
// const midtransClient = require('midtrans-client');
// const { tokenVerifier } = require('../helpers/jwt');

// const userOrderController = {
//   async createPayment(req, res) {
//     console.log(req.body);
//     try {
//       const token = req.headers.authorization.split(' ')[1];
//       const decodedToken = tokenVerifier(token);

//       if (!decodedToken) {
//         return res.status(401).json({ status: 401, message: 'Unauthorized' });
//       }

//       const userId = decodedToken.userId;
//       const { id: detailUserId } = decodedToken;
//       const { provider, noPayment } = req.body;

//       if (!provider || !noPayment || !detailUserId) {
//         return res.status(400).json({ error: 'Harap lengkapi semua informasi pesanan.' });
//       }

//       // Validate provider
//       const allowedProviders = ['MidTrans', 'ProviderLainnya'];
//       if (!allowedProviders.includes(provider)) {
//         return res.status(400).json({ error: 'Provider tidak valid.' });
//       }

//       // Check if DetailUser with the corresponding ID exists in the database
//       const existingDetailUser = await detailUser.findByPk(detailUserId);
//       if (!existingDetailUser) {
//         return res.status(404).json({ error: 'Detail user not found or invalid.' });
//       }

//       // Create payment using the UserPayment model
//       const newOrder = await UserPayment.create({
//         provider,
//         noPayment,
//         detailUserId,
//       });

//       // Use Midtrans API to create a transaction
//       const snap = new midtransClient.Snap({
//         isProduction: false,
//         serverKey: midtransConfig.serverKey,
//         clientKey: midtransConfig.clientKey,
//       });

//       const parameter = {
//         transaction_details: {
//           order_id: newOrder.id.toString(),
//           gross_amount: 40000, // Replace with your actual amount
//         },
//       };

//       snap
//         .createTransaction(parameter)
//         .then((transactionToken) => {
//           console.log(transactionToken);
//           res.status(201).json({
//             message: 'Pesanan berhasil dibuat.',
//             order: newOrder,
//             transactionToken,
//           });
//         })
//         .catch((error) => {
//           console.error('Error creating transaction:', error);
//           res.status(500).json({ error: error.message });
//         });
//     } catch (error) {
//       console.error('Error creating payment:', error);
//       res.status(500).json({
//         error: error.response ? error.response.data.error : 'Payment failed. Please try again.',
//       });
//     }
//   },

//   async getPaymentsByUserId(req, res) {
//     const { detailUserId } = req.params;
//     try {
//       const orders = await UserPayment.findAll({ where: { detailUserId } });
//       res.status(200).json({ orders });
//     } catch (error) {
//       console.error('Error getting payments by user ID:', error);
//       res.status(500).json({ error: error.message });
//     }
//   },
// };

// module.exports = userOrderController;


const { midtransConfig, pool } = require('../config/config.json')['development'];
const { userPayment, detailUser } = require('../models');

const Snap = require('midtrans-client').Snap;

// Function to initiate payment
const createPayment = async (req, res, next) => {
  try {
    const { detailUserId, provider, noPayment } = req.body;

    // Validate if detailUser exists
    const existingDetailUser = await detailUser.findByPk(detailUserId);
    if (!existingDetailUser) {
      return res.status(404).json({ status: 404, error: 'DetailUser not found' });
    }

    // Generate payment token using Midtrans Snap API
    const paymentToken = await generatePaymentToken(provider, noPayment);

    // Save payment details in the database
    const payment = await userPayment.create({
      detailUserId,
      provider,
      noPayment,
    });

    res.status(200).json({ status: 200, paymentToken, payment });
  } catch (error) {
    next(error);
  }
};

// Function to generate payment token using Midtrans Snap API
const generatePaymentToken = async (provider, noPayment) => {
  const { clientKey } = midtransConfig;

  // Set your server key from Midtrans
  const snap = new Snap({
    isProduction: false, // Set to true for production
    serverKey: midtransConfig.serverKey,
  });

  const parameter = {
    transaction_details: {
      order_id: `ORDER-${Date.now()}`,
      gross_amount: 10000, // Set the amount based on your requirement
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
    return paymentToken;
  } catch (error) {
    throw new Error(`Failed to generate payment token: ${error.message}`);
  }
};

module.exports = {
  createPayment,
};
