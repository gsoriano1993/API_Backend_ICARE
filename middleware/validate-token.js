const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET || "token secreto");
    req.user = verified.user;
    console.log("TOKEN VERIFICADO", verified.user);
    next();
  } catch (error) {
    res.status(400).json({ error: "Token no valido, acceso denegado" });
  }
};

module.exports = verifyToken;
