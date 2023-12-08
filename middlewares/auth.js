const { tokenVerifier } = require('../helpers/jwt');

const authentication = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ status:401, message: 'Token tidak ditemukan atau tidak valid!' });
  }
  const token = authorization.slice(7); 

  try {
    const decoded = tokenVerifier(token);
    const { isUser } = decoded;

    if (!isUser) {
      return res.status(403).json({ status:403, message: 'Unauthorized access! Please register first.' });
    }
    req.user = decoded
    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({ status: 401, message: 'Token salah!' });
  }
};

const verifyRole = function (rolesList = []) {
  return (req, res, next) =>{
    const role = req.user.isUser
    const roleList = [rolesList]
    console.log(role)
    console.log(roleList);
    const data = role == roleList ? true : false
    if(data == false) {
      res.sendStatus(401)
    }
    next()
  }
}

module.exports = {
  authentication,
  verifyRole
};