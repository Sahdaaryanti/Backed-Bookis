// const { User } = require('../models');
// const { tokenSign, tokenVerifier } = require('../helpers/jwt');

// // Register
// const register = async (req, res, next) => {
//     try {
//       const { email, password, levelUser } = req.body;
  
//       if (!email || !password) {
//         return res.status(400).json({ status: 400, message: 'Incomplete data. Please provide all required fields.' });
//       }
  
//       const newUser = await User.create({
//         email,
//         password,
//         levelUser,
//       });
  
//       const userId = newUser.id;
//       if (levelUser == 'admin') {
//         token = tokenSign({ userId: userId, isUser: 'admin' });
//       }else{
//         token = tokenSign({ userId: userId, isUser: 'member' });
//       }
//       res.status(201).json({status: 201, message: 'Registration successful', token });
//     } catch (error) {
//       next(error);
//     }
//   };
  
//   // Login
//   const login = async (req, res, next) => {
//     try {
//       const { email, password } = req.body;
  
//       const result = await User.findOne({
//         where: {
//           email,
//           password,
//         },
//       });
  
//       if (result) {
//         const userId = result.id;
//         const isUser = result.levelUser;
//         const token = tokenSign({ userId : userId, isUser: isUser });
//         res.status(200).json({ status:200, message:'Login successful', token, isUser});

//       } else {
//         res.status(401).json({ status:401, message: 'Invalid email or password' });
//       }
//     } catch (error) {
//       next(error);
//     }
//   };

//   // Logout
//   const logout = async (req, res, next) => {
//     try {
//       const token = req.headers.authorization.split(' ')[1];
//       const decodedToken = tokenVerifier(token);

//       if (!decodedToken) {
//         return res.status(401).json({ status: 401, message: 'Unauthorized' });
//       }

//       const userId = decodedToken.userId;

//       res.status(200).json({ status: 200, message: 'Logout successful' });
//     } catch (error) {
//       next(error);
//     }
//   };

// module.exports = {
//     register,
//     login,
//     logout
// }
