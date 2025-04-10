const express = require('express');
const { getUsers, verifyUser, updateProfile, getUserProfile, validateUpdateProfile } = require('../controllers/userController');
const { protect: authMiddleware, authorize } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/profiles')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Get all users
router.get('/', authMiddleware, authorize(['farmer', 'industry', 'regulator', 'admin']), getUsers);

// Get user profile
router.get('/profile', authMiddleware, authorize(['farmer', 'industry', 'regulator', 'admin']), getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, authorize(['farmer', 'industry', 'regulator', 'admin']), upload.single('profilePicture'), validateUpdateProfile, updateProfile);

// Verify a user
router.post('/verify/:id', authMiddleware, verifyUser);

module.exports = router;