// const { PesananPayment, DetailPesanan } = require('../models');
// const { MidtransService } = require('../services'); 

// const PesananPaymentController = {
//   createPesananPayment: async (req, res) => {
//     const { pesananId, provider, statusBayar } = req.body;

//     try {
//       // Fetch additional details for the transaction (if needed)
//       const detailPesanan = await DetailPesanan.findByPk(pesananId);

//       if (!detailPesanan) {
//         return res.status(404).json({ error: 'DetailPesanan not found' });
//       }

//       // Add Midtrans payment logic using MidtransService
//       const midtransResponse = await MidtransService.createPayment({
//         orderId: pesananId,
//         amount: detailPesanan.total,
//         paymentMethod: provider,
//         // Add other Midtrans parameters as needed
//       });

//       // Check if Midtrans transaction is successful
//       if (midtransResponse.status !== 'success') {
//         return res.status(400).json({ error: 'Midtrans transaction failed' });
//       }

//       // Create PesananPayment entry in the database
//       const pesananPayment = await PesananPayment.create({
//         pesananId,
//         provider,
//         statusBayar,
//         midtransTransactionId: midtransResponse.transactionId,
//       });

//       res.status(201).json(pesananPayment);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   },
//   // Add other pesananPayment-related controllers as needed
// };

// module.exports = PesananPaymentController;


const { pesananPayment } = require('../models');

// Create
const createPesananPayment = async (req, res) => {
  try {
    const newPesananPayment = await pesananPayment.create(req.body);
    res.json(newPesananPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Read
const getPesananPaymentById = async (req, res) => {
  try {
    const pesananPaymentData = await pesananPayment.findByPk(req.params.id);
    res.json(pesananPaymentData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update
const updatePesananPayment = async (req, res) => {
  try {
    const updatedPesananPayment = await pesananPayment.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedPesananPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete
const deletePesananPayment = async (req, res) => {
  try {
    await pesananPayment.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: 'Pesanan Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    createPesananPayment,
    getPesananPaymentById,
    updatePesananPayment,
    deletePesananPayment,
  };
  