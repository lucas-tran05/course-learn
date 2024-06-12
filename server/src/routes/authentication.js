const authController = require('../controllers/authController');
const router = require('express').Router();
const middlewareController = require('../middlewares/middlewareController');

// Register
router.post('/client/register', authController.registerUser);

// Login
router.post('/client/login', authController.loginUser);

// Refresh
router.post('/refresh', authController.refreshToken);

// Logout
router.post('/logout',middlewareController.verifyToken, authController.logoutUser);

// Get user
// router.get('/get',middlewareController.verifyToken, authController.getUser);

module.exports = router