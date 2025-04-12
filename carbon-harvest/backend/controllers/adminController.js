const User = require('../models/User');
const BlockchainService = require('../blockchain/blockchainService');

const blockchainService = new BlockchainService();
/**
 * Get all users with pagination and filtering
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const userType = req.query.userType;
        const verificationStatus = req.query.verified;

        let query = {}; // Initialize query object
        
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
         // Handle errors and respond with a 500 status code
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

/**
 * Get single user details
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });// Respond with 404 if user not found
        }
        res.json(user);// Respond with the user data
    } catch (error) {
         // Handle errors and respond with a 500 status code
        res.status(500).json({ message: 'Error fetching user details', error: error.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const updates = { ...req.body };
        delete updates.password; // Prevent password updates through this endpoint

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

         // Prepare data for blockchain update
        const blockchainUserData = {
            // Convert ObjectId to string
            userId: user._id.toString(), 
            name: user.name,
            email: user.email,
            userType: user.userType,
            // Include other necessary fields
        };
        
        try {
            // Update user in the blockchain
            await blockchainService.updateUser(blockchainUserData);
             // Log the admin action
             console.log(`User ${user._id} updated by admin ${req.user._id} at ${new Date()}`);
        } catch (blockchainError) {
            console.error('Blockchain update error:', blockchainError);
            return res.status(500).json({ message: 'Error updating user in blockchain', error: blockchainError.message });
        }
         // Respond with the updated user data
         res.json(user);
    } catch (error) {
         // Handle errors and respond with a 500 status code
        console.error('Error updating user:', error);
         // Error when updating the user
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }// Respond with 404 if user not found
        try {
            // Delete user in blockchain
            await blockchainService.deleteUser(user._id.toString());
            // Log the admin action
            console.log(`User ${user._id} deleted by admin ${req.user._id} at ${new Date()}`);
        } catch (blockchainError) {
            console.error('Blockchain delete error:', blockchainError);
            return res.status(500).json({ message: 'Error deleting user in blockchain', error: blockchainError.message });// Error when deleting in the blockchain
        }
        // Respond with success message
        // Respond with success message
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Verify user
exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, // Get the user ID from the request parameters
            { $set: { verified: true } },// Update the user's verification status to true
            { new: true } // Return the modified document rather than the original
        ).select('-password'); // Exclude the password from the returned user data
          // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });// Respond with 404 if user not found
        }

         try {
            // Verify user in blockchain
            await blockchainService.verifyUser({
                userId: user._id.toString(),// Convert user ID to string for blockchain
            });
            // Log the admin action
            console.log(`User ${user._id} verified by admin ${req.user._id} at ${new Date()}`);
        } catch (blockchainError) {
            console.error('Blockchain create user error:', blockchainError);
            return res.status(500).json({ message: 'Error verifying user in blockchain', error: blockchainError.message });
        }
         // Respond with the updated user data
         res.json(user);
    } catch (error) {
        // Handle errors and respond with a 500 status code
        console.error('Error verifying user:', error);
        res.status(500).json({ message: 'Error verifying user', error: error.message });
    }
};
