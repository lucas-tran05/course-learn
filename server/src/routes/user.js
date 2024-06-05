const userController = require('../controllers/userController');
const middlewareController = require('../middlewares/middlewareController');
const router = require('express').Router();

// Get all users
router.get('/get', middlewareController.verifyTokenAndAdminAuth, userController.getAllUsers);

// Delete user
router.delete('/delete/:id', middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;
