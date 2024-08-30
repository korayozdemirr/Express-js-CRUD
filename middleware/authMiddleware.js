const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try{
    const decoded = jwt.verify(token, "Secret key")
    req.userID = decoded.id
    next();
  }catch{
    res.status(400).send("Invalid token");
  }
}

module.exports = authMiddleware;
