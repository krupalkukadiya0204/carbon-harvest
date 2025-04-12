const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['BADGE', 'CHALLENGE', 'STREAK', 'REFERRAL'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  progress: {
    current: Number,
    target: Number
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  points: {
    type: Number,
    default: 0
  },
  expiresAt: Date,
  streakCount: {
    type: Number,
    default: 0
  },
  lastLoginDate: Date,
  referralCount: {
    type: Number,
    default: 0
  }},{ timestamps: true
});

// Index for leaderboard queries
achievementSchema.index({ points: -1, userId: 1 });

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;
