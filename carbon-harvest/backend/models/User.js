const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ["Farmer", "Industry", "Regulator"]
    },
    
    // Profile Information
    profilePicture: {
        type: String,
        default: ""
    },
    organization: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    
    // Address Information
    address: {
        type: String,
        required: function() {
            return this.onboardingStatus === "completed";
        }
    },
    city: {
        type: String,
        required: function() {
            return this.onboardingStatus === "completed";
        }
    },
    state: {
        type: String,
        required: function() {
            return this.onboardingStatus === "completed";
        }
    },
    country: {
        type: String,
        required: function() {
            return this.onboardingStatus === "completed";
        }
    },
    pincode: {
        type: String,
        required: function() {
            return this.onboardingStatus === "completed";
        }
    },
    
    // Banking Information
    bankName: {
        type: String,
        required: function() {
            return this.onboardingStatus === "completed";
        }
    },
    accountNumber: {
        type: String,
        required: function() {
            return this.onboardingStatus === "completed";
        }
    },
    ifscCode: {
        type: String,
        required: function() {
            return this.onboardingStatus === "completed";
        }
    },
    
    // Legal Information
    panNumber: {
        type: String,
        required: function() {
            return this.onboardingStatus === "completed";
        }
    },
    gstNumber: {
        type: String,
        required: function() {
            return this.userType === "Industry" && this.onboardingStatus === "completed";
        }
    },
    
    // Farmer Specific Fields
    farmSize: {
        type: String,
        required: function() {
            return this.userType === "Farmer" && this.onboardingStatus === "completed";
        }
    },
    farmType: {
        type: String,
        required: function() {
            return this.userType === "Farmer" && this.onboardingStatus === "completed";
        }
    },
    cropTypes: {
        type: String,
        required: function() {
            return this.userType === "Farmer" && this.onboardingStatus === "completed";
        }
    },
    
    // Industry Specific Fields
    certifications: {
        type: String,
        required: function() {
            return this.userType === "Industry" && this.onboardingStatus === "completed";
        }
    },
    
    // Status and Verification
    onboardingStatus: {
        type: String,
        enum: ["pending", "completed", "bypassed"],
        default: "pending"
    },
    verified: { 
        type: Boolean,
        default: false
    },
    preVerified: {
        type: Boolean,
        default: false
    },
    
    // Settings
    settings: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        smsNotifications: {
            type: Boolean,
            default: true
        },
        language: {
            type: String,
            enum: ["en", "hi", "mr"],
            default: "en"
        },
        theme: {
            type: String,
            enum: ["light", "dark"],
            default: "light"
        },
        twoFactorAuth: {
            type: Boolean,
            default: false
        }
    },
    
    // Gamification
    points: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
