const Achievement = require('../models/Achievement');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const BlockchainService = require('../blockchain/blockchainService');
const blockchainService = new BlockchainService();
const xss = require('xss-clean');
const authMiddleware = require('../middleware/authMiddleware');
const errorHandlingMiddleware = require('../middleware/errorHandlingMiddleware');


// Get user's gamification stats
exports.getUserStats = async (req, res) => {
  try {
      // Check for authentication and authorization
      authMiddleware.isAuthenticated(req, res);
    const achievements = await Achievement.find({ userId: req.user._id });
    
    // Calculate total points from achievements
    const points = achievements.reduce((total, achievement) => total + achievement.points, 0);
    
    // Calculate level based on points (example: every 1000 points = 1 level)
    const level = Math.floor(points / 1000) + 1;
    
    // Get user's rank
    const usersWithHigherPoints = await Achievement.aggregate([      
      {
        $group: {
          _id: '$userId',
          totalPoints: { $sum: '$points' }
        }
      },
      {
        $match: {
          totalPoints: { $gt: points }
        }
      }
    ]);
    
    const rank = usersWithHigherPoints.length + 1;
    
    res.json({
      points,
      level,
      rank,
      badges: user.badges || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting user stats', error: error.message });
  }
};

// Get user's achievements and badges



exports.getUserAchievements =  async (req, res) => {
  try {
        // Check for authentication and authorization
    authMiddleware.isAuthenticated(req, res);
    const achievements = await Achievement.find({ userId: req.user._id });
    // Return the result
      res.status(200).json(achievements);
    // Handle errors
  } catch (error) {
  } catch (error) {
    res.status(500).json({ message: 'Error getting user achievements', error: error.message });
  }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
        // Check for authentication and authorization
    authMiddleware.isAuthenticated(req, res);
    const leaderboard = await Achievement.aggregate([
      {
        $group: {
          _id: '$userId',
          totalPoints: { $sum: '$points' }
        }
      },
      {
        $sort: { totalPoints: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      }
    ]);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error getting leaderboard', error: error.message });
  }
};

// Create or update daily streak
exports.updateDailyStreak = async (req, res) => {
    // Check for authentication and authorization
    authMiddleware.isAuthenticated(req, res);
  try {
    // Sanitize input
    req.user._id = xss(req.user._id);// Fix: Sanitize req.user._id
    
    if (req.body) {
      Object.keys(req.body).forEach(key => req.body[key] = xss(req.body[key])); // Fix: Sanitize request body
    }
    // Check if the user exist
    const today = new Date();
    const achievement = await Achievement.findOne({
      userId: req.user._id,
      type: 'STREAK'
    });

    if (!achievement) {
      const newStreak = new Achievement({
        userId: req.user._id,
        user: {
            userId: req.user._id,
        publickey: "",
        role: "",
        metadata: {}
          },
          project: {
            projectId: "",
            projectData: {}
          },
        type: 'STREAK',
        name: 'Daily Login Streak',
        streakCount: 1,
        lastLoginDate: today,
        points: 10
      });
      await newStreak.save();
      return res.json(newStreak);
    } //check if the last login is before today
    const lastLogin = new Date(achievement.lastLoginDate);
    const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
    // Fix: Check for valid data
    if (isNaN(diffDays) || diffDays < 0) {
        return res.status(400).json({ message: 'Invalid date calculation' });
    }
    if (diffDays === 1) {
      achievement.streakCount += 1;
      achievement.points += 10;
    } else if (diffDays > 1) {
      achievement.streakCount = 1;
      achievement.points = 10;
    }

    achievement.lastLoginDate = today;
    await achievement.save();
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: 'Error updating daily streak', error: error.message });
        // Handle specific errors
      errorHandlingMiddleware.handleSpecificErrors(error, res);
    
  }
};

// Create a new challenge
exports.validateCreateChallenge = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('target').isNumeric().withMessage('Target must be a number').custom(value => value > 0).withMessage('Target must be positive'),
  body('expiresAt').isISO8601().toDate().withMessage('ExpiresAt must be a valid date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.createChallenge = async (req, res) => {
    // Check for authentication and authorization
    authMiddleware.isAuthenticated(req, res);
  try {
        // Fix: Sanitize input
      req.user._id = xss(req.user._id);
    if (req.body) {
      Object.keys(req.body).forEach(key => req.body[key] = xss(req.body[key]));
    }
        // Get the data
    const { name, description, target, expiresAt } = req.body;
    const challenge = new Achievement({
      userId: req.user._id,
      user: {
        userId: req.user._id,
        publickey: "",
        role: "",
        metadata: {}
      },
      project: {
        projectId: "",
        projectData: {}
      },
      type: 'CHALLENGE',
      name,
        
      blockchainId: '',
        credit: {},
        
      description,
      progress: {
        current: 0,
        target
      },
      expiresAt,
      points: 100
    });
        // create the new achievement in the blockchain
      const blockchainData = {
        userId: req.user._id,
        achievement: challenge
      };
      try {
        const blockchainResponse = await blockchainService.createAchievement(blockchainData);
        challenge.blockchainId = blockchainResponse.achievementId;
      } catch (error) {
        console.error('Error creating achievement on blockchain:', error);
        return res.status(500).json({ message: 'Error creating achievement on blockchain', error: error.message });
      }
        // Save in the database

    await challenge.save();
    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ message: 'Error creating challenge', error: error.message });
  }
};

// Update challenge progress
exports.validateUpdateChallengeProgress = [
  body('challengeId').isMongoId().withMessage('Invalid challenge ID'),
  body('progress').isNumeric().withMessage('Progress must be a number').custom(value => value >= 0).withMessage('Progress must be positive'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];



exports.updateChallengeProgress = async (req, res) => {
    // Check for authentication and authorization
    authMiddleware.isAuthenticated(req, res);
  try {
    // Sanitize input
    if (req.body) {
      Object.keys(req.body).forEach(key => req.body[key] = xss(req.body[key]));
    }
        // Get the data
    const { challengeId, progress } = req.body;
    const challenge = await Achievement.findById(challengeId);
      // Check if the achievement is on the blockchain

    if (!challenge.blockchainId) {
        return res.status(500).json({ message: 'Achievement not found on blockchain' });
    }
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    challenge.progress.current = progress;// Update the progress
    if (challenge.progress.current >= challenge.progress.target) {
      challenge.completed = true;
      challenge.completedAt = new Date();
    }

        const blockchainData = {
            userId: req.user._id,
            achievement: challenge
        };
        try {
            await blockchainService.updateAchievement(blockchainData);
        } catch (error) {
            console.error('Error updating achievement progress on blockchain:', error);
            return res.status(500).json({ message: 'Error updating achievement progress on blockchain', error: error.message });
        }
        // Save in the database
    await challenge.save();
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: 'Error updating challenge progress', error: error.message });
  }
};

// Process referral
exports.validateProcessReferral = [
  body('referralCode').notEmpty().withMessage('Referral code is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];



exports.processReferral = async (req, res) => {
    // Check for authentication and authorization
    authMiddleware.isAuthenticated(req, res);
  try {
    // Sanitize input
    if (req.body) {
      Object.keys(req.body).forEach(key => req.body[key] = xss(req.body[key]));
    }
    // Get the referral code
    const { referralCode } = req.body;
    const referrer = await User.findOne({ referralCode });
    
    if (!referrer) {
      return res.status(404).json({ message: 'Invalid referral code' });
    }
      
      if (!referrer.blockchainId) {
          return res.status(500).json({ message: 'Referrer not found on blockchain' });
      }
      
      if (!req.user.blockchainId) {
          return res.status(500).json({ message: 'User not found on blockchain' });
      }
      // Create the achievement

    let referralAchievement = await Achievement.findOne({
      userId: referrer._id,
      type: 'REFERRAL'
    });

    if (!referralAchievement) {
      referralAchievement = new Achievement({
        userId: referrer._id,
        type: 'REFERRAL',
        name: 'Referral Program',
        referralCount: 1,
        points: 50
      });
    } else {
      referralAchievement.referralCount += 1;
      referralAchievement.points += 50;
    }
    // Add in the blockchain
      const blockchainData = {
        userId: referrer._id,
        achievement: referralAchievement
      };
      try {
        await blockchainService.createAchievement(blockchainData);
      } catch (error) {
        console.error('Error creating referral achievement on blockchain:', error);
        return res.status(500).json({ message: 'Error creating referral achievement on blockchain', error: error.message });
      }
    // Save in the database
    await referralAchievement.save();
    res.json(referralAchievement);
  } catch (error) {
    res.status(500).json({ message: 'Error processing referral', error: error.message });
  }
};
