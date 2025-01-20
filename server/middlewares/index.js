const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]
  if (!token)
      return res.status(401).json({
          success: false,
          message: "Unauthorized user!",
      });
  try {
      const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
      req.user = decoded;
      next();
  } catch (error) {
      res.status(401).json({
          success: false,
          message: "Unauthorized user!",
      });
  }
};


module.exports = authMiddleware;