const User = require('../models/User');
const { validateAdmin } = require('../middleware/authMiddleware');

// Get all users with pagination and filtering
exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const userType = req.query.userType;
        const verificationStatus = req.query.verified;

        let query = {};
        
        // Apply filters
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { organization: { $regex: search, $options: 'i' } }
            ];
        }
        if (userType) query.userType = userType;
        if (verificationStatus !== undefined) query.verified = verificationStatus === 'true';

        const users = await User.find(query)
            .select('-password')
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        res.json({
            users,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalUsers: total
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Get single user details
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user details', error: error.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const updates = { ...req.body };
        delete updates.password; // Prevent password updates through this endpoint

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log the admin action
        console.log(`User ${user._id} updated by admin ${req.user._id} at ${new Date()}`);

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log the admin action
        console.log(`User ${user._id} deleted by admin ${req.user._id} at ${new Date()}`);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Verify user
exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { verified: true } },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Log the admin action
        console.log(`User ${user._id} verified by admin ${req.user._id} at ${new Date()}`);

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error verifying user', error: error.message });
    }
};
