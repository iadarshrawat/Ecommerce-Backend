const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Fixed ref
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Fixed ref
            quantity: { type: Number, required: true, min: 1 }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);