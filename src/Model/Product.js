const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    value_buy: {
        type: Number,
        required: true,
        max: 1024,
        min: 6
    },
    value_sell: {
        type: Number,
        required: true,
        max: 1024,
        min: 6
    },
    category: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    stock: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    created_by:{
        type: mongoose.ObjectId,
        ref: 'Users',
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

module.exports = mongoose.model('Product', productSchema);