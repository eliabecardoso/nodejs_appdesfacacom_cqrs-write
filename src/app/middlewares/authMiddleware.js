const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Usuário sem token" });

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    req.id = decoded.id;
    req.username = decoded.username;
    
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
