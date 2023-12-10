const { User } = require('../models');
const { tokenSign } = require('../helpers/jwt');
const { tokenVerifier } = require('../helpers/jwt');

// Register Admin
const registerAdmin = async (req, res, next) => {
  try {
    const { email, password, levelUser } = req.body;

    if (!email || !password || !levelUser) {
      return res.status(400).json({ status: 400, message: 'Incomplete data. Please provide all required fields.' });
    }

    if (levelUser !== 'admin') {
      return res.status(400).json({status: 400, message: 'Invalid levelUser for admin registration.' });
    }

    const newUser = await User.create({
      email,
      password,
      levelUser,
    });

    const adminId = newUser.id;
    const token = tokenSign({ userId: adminId, isAdmin: true });

    res.status(201).json({status: 201, message: 'Registration successful', token });
  } catch (error) {
    next(error);
  }
};

// Register Member
const registerMember = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 400, message: 'Incomplete data. Please provide all required fields.' });
    }

    const newUser = await User.create({
      email,
      password,
      levelUser: 'member',
    });

    const memberId = newUser.id;
    const token = tokenSign({ userId: memberId, isAdmin: false });

    res.status(201).json({ status: 201, message: 'Registration successful', token });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (result) {
      const userId = result.id;
      const isUser = result.levelUser;
      const token = tokenSign({userId: userId, isUser: isUser });
      res.status(200).json({ status:200, message:'Login successful', token, levelUser: isUser });
    } else {
      res.status(401).json({ status:401, message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

// Get All Admins (only accessible by admin)
const getAllAdmins = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const result = await User.findAll({
        where: {
          levelUser: 'admin',
        },
      });

      res.status(200).json({status:200, message:'Success Get Admins', data:result});
    } else {
      res.status(403).json({ status: 403, message: 'Unauthorized access! Admin access required.' });
    }
  } catch (error) {
    next(error);
  }
};

// Get Admin by ID (only accessible by admin)
const getAdminById = async (req, res, next) => {
  const adminId = req.params.id;

  try {
    if (req.user.isAdmin) {
      const result = await User.findOne({
        where: {
          id: adminId,
          levelUser: 'admin',
        },
      });

      if (result) {
        res.status(200).json({status:200, message:`Success Get Admin With Id: ${adminId}`, data:result});
      } else {
        res.status(404).json({ status:404, message: 'Admin not found' });
      }
    } else {
      res.status(403).json({ status: 403, message: 'Unauthorized access! Admin access required.' });
    }
  } catch (error) {
    next(error);
  }
};

// Get All Members (only accessible by admin)
const getAllMembers = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const result = await User.findAll({
        where: {
          levelUser: 'member',
        },
      });

      res.status(200).json({status:200, message:'Success Get Members', data:result});
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).json({ status: 403, message: 'Unauthorized access! Admin access required.' });
  }
};

// Get Member by ID (only accessible by admin)
const getMemberById = async (req, res, next) => {
  const memberId = req.params.id;

  try {
    if (req.user.isAdmin) {
      const result = await User.findOne({
        where: {
          id: memberId,
          levelUser: 'member',
        },
      });

      if (result) {
        res.status(200).json({status:200, message:`Success Get Member With Id: ${memberId}`, result});
      } else {
        res.status(404).json({status:404, message: 'Member not found'});
      }
    } else {
      res.status(403).json({ status: 403, message: 'Unauthorized access! Admin access required.' });
    }
  } catch (error) {
    next(error);
  }
};

// Logout
const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = tokenVerifier(token);

    if (!decodedToken) {
      return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }

    const userId = decodedToken.userId;

    res.status(200).json({ status: 200, message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerAdmin,
  registerMember,
  login,
  getAllAdmins,
  getAdminById,
  getAllMembers,
  getMemberById,
  logout
};
