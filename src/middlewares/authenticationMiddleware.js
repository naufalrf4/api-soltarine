const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === process.env.ACCESS_TOKEN) {
    next();
  } else {
    res.send("Akses Token diperlukan");
    res.sendStatus(401);
  }
};

module.exports = authenticateToken;
