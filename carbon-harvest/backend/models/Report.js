const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["carbon_credit", "emission", "verification", "audit"]
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    industryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add indexes for better query performance
reportSchema.index({ createdAt: -1 });
reportSchema.index({ farmerId: 1, createdAt: -1 });
reportSchema.index({ industryId: 1, createdAt: -1 });
reportSchema.index({ type: 1, status: 1 });

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
