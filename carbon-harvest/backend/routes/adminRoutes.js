const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, validateAdmin } = require('../middleware/authMiddleware');

// Protect all admin routes with authentication and admin validation
router.use(protect);
router.use(validateAdmin);

// User management routes
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserDetails);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.post('/users/:id/verify', adminController.verifyUser);

module.exports = router;
