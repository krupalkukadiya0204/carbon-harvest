const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creditType: {
        type: String,
        required: true,
        enum: ['Soil Carbon', 'Renewable Energy', 'Agroforestry', 'Sustainable Agriculture']
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Sold', 'Pending'],
        default: 'Available'
    },
    location: {
        address: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: {
             type: String 
        }
    },
    sustainabilityMetrics: {
        carbonReduction: Number,
        waterSaved: Number,
        soilHealth: Number,
        biodiversityScore: Number
    },
    verificationDetails: {
        verifiedBy: String,
        verificationDate: Date,
        verificationMethod: String,
        documents: [String]
    },
    tradingHistory: [{
        date: Date,
        price: Number,
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

creditSchema.set('timestamps', true)
module.exports = mongoose.model('Credit', creditSchema);