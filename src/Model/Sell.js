const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    costummer: {
        type: mongoose.ObjectId,
        ref: 'Customer',
        required: true,
        max: 1024,
        min: 6
    },
    products: {
        type: mongoose.ObjectId,
        ref: 'Product',
        required: true,
        max: 1024,
        min: 6
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);