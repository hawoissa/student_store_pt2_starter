const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const generateToken = (data) => jwt.sign(data, SECRET_KEY, {expiresIn: "24h"});

const createUserToken = (user) => {
   const userInfo = {
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin || false
   }
   return generateToken(userInfo);
}

const validateToken = (token) => {
   try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
   } catch (err) {
      return {}
   }
}

module.exports = {
   generateToken,
   createUserToken,
   validateToken
}