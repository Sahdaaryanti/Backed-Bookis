// const {ulasanBuku, Buku, Kategori, sequelize } = require('../models')
// const dashboardUser = async(req, res, next) => {
//     try {
//         const all = await Buku.findAll();
//         const popularBooks = await Buku.findAll({
//             attributes: ['id', 'judul', 'harga', [sequelize.fn('AVG', sequelize.col('ulasanBukus.rating')), 'averageRating']],
//             include: [{ 
//                 model: ulasanBuku, 
//                 as : 'ulasanBukus',
//                 attributes: []
//             }],
//             group : ['Buku.id'],
//             order : [[sequelize.col('averageRating'), 'DESC']],
//         })
//         const recommendedbyCategoryBooks = await Kategori.findAll({
//             include : {
//                 model: Buku,
//                 as : 'bukus',
//                 separate: true,
//                 attributes : ['id','judul','harga'],
//                 order: [
//                     ['id', 'DESC']
//                 ]
              
//             }
//         })
//         res.status(200).json({ status: 200, message: 'Success', data: {recommendedbyCategoryBooks,all,popularBooks }});
//     } catch (err) {
//         console.log(err)
//     }
// }
// module.exports = {
//     dashboardUser
// }