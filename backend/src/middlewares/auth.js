const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    // If user is'nt logged in
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    console.error(error.message);
    return res.json(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authUser;
