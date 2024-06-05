const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

const authController = {
  // Generate token
  generateToken: (user) => {
    return jwt.sign({
      id: user._id,
      admin: user.admin,
      stuID: user.stuID
    }, process.env.JWT_SEC, { expiresIn: "365d" });
  },

  // Generate refresh token
  generateRefreshToken: (user) => {
    return jwt.sign({
      id: user._id,
      admin: user.admin,
      stuID: user.stuID
    }, process.env.JWT_SEC_REFRESH, { expiresIn: "360d" });
  },

  // Register user
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        name: req.body.name,
        stuID: req.body.stuID,
        username: req.body.username,
        email: req.body.email,
        password: hashed
      });
      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Login user
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) {
        return res.status(404).json({ message: "Wrong password" });
      }
      if (user && password) {
        const accessToken = authController.generateToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict"
        });
        const respond = { ...user._doc, accessToken };
        delete respond.password;
        return res.status(200).json(respond);
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Refresh token
  refreshToken: (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: "Refresh token is not valid" });
    }
    jwt.verify(refreshToken, process.env.JWT_SEC_REFRESH, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Refresh token is not valid" });
      }
      refreshTokens = refreshTokens.filter(token => token !== refreshToken);
      const newAccessToken = authController.generateToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict"
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  },

  // Logout user
  logoutUser: (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
    return res.status(200).json({ message: "Logout successful" });
  }
};

module.exports = authController;
