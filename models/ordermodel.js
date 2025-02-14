const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', "delivered"],
        default: 'pending'
    }
}, {timeStamps: true})


module.exports = mongoose.model('Order', orderSchema);