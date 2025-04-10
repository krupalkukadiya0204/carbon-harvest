const mongoose = require('mongoose');
const { Schema } = mongoose;
const farmerProfileSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    farmSize: {
        type: Number,
        required: true
    },
    cropTypes: {
        type: String,
        required: true
    },
    farmingPractices: {
        type: String,
        required: true
    },
    location: {
        address: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String },
    },    
    sustainabilityGoals: String,
    carbonCreditsInterest: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const industryProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    industryType: {
        type: String,
        required: true
    },
    companySize: {
        type: String,
        required: true
    },
    annualEmissions: {
        type: Number,
        required: true
    },
    sustainabilityPrograms: String,
    location: {
        address: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String },
    },
    carbonReductionGoals: {
        type: String,
        required: true
    },
    interestedInPurchasing: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const regulatorProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    jurisdiction: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    regulatoryFramework: {
        type: String,
        required: true
    },
    verificationProcess: {
        type: String,
        required: true
    },
    location: {
        address: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String },
    },
    monitoringApproach: {
        type: String,
        required: true
    }
}, { timestamps: true });

const FarmerProfile = mongoose.model('FarmerProfile', farmerProfileSchema);
const IndustryProfile = mongoose.model('IndustryProfile', industryProfileSchema);
const RegulatorProfile = mongoose.model('RegulatorProfile', regulatorProfileSchema);

module.exports = {
    FarmerProfile,
    IndustryProfile,
    RegulatorProfile
};
