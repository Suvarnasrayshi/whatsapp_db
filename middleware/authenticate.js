const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const secretKey = process.env.SECRET_KEY;

exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userid = decoded.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

