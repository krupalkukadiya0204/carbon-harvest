const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Protect all admin routes with authentication and admin authorization
router.use(protect);
router.use(authorize(['admin']));

// User management routes

router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserDetails);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.post('/users/:id/verify', adminController.verifyUser);

module.exports = router;
