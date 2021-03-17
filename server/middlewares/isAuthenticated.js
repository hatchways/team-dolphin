const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.dolphinToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded);
    req.user = await User.findById(decoded.id);
    console.log(req.user);

    next();
  } catch (error) {
    console.log("ERRROR");
    res.status(401).json({ message: "Not authenticated" });
  }
};

module.exports = { isAuthenticated };
