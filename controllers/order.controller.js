const Order = require("../models/order.model");
const Cart = require('../models/cart.model');
const { processPayment } = require('./payment.controller'); 
const orderModel = require("../models/order.model");

const addOrder = async (req, res)=>{
    try {
        const { cartId, paymentMethod, shippingAddress } = req.body;
        const userId = req.user.id;

        // Fetch the cart details
        const cart = await Cart.findOne({ _id: cartId, user: userId }).populate('products.product', 'name price');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty or not found",
            });
        }

        // Calculate total price
        let totalAmount = 0;
        cart.products.forEach(item => {
            totalAmount += item.product.price * item.quantity;
        });

        // 🔴 STEP 1: Process the Payment
        const paymentResult = await processPayment({ orderId: cartId, amount: totalAmount, paymentMethod });

        if (!paymentResult.success) {
            return res.status(400).json({
                success: false,
                message: "Payment failed. Order not placed.",
            });
        }

        // 🔵 STEP 2: Create the Order after Payment Success
        const order = await Order.create({
            user: userId,
            products: cart.products,
            totalAmount,
            paymentMethod,
            shippingAddress,
            status: 'Pending',
        });

        // Clear the cart after order placement
        await Cart.findByIdAndDelete(cartId);

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error placing order",
            error: error.message
        });
    }
}
 
const getOrders = async(req, res)=>{
    const userId = req.userId;
    const orders = await Order.find({user: userId});

    res.status(200).json({
        success: true,
        orders
    })
}

const getOrder = async (req, res)=>{
    const orderid = req.params.id;
    const order = await Order.findById({orderid});

    res.status(200).json({
        success: true,
        order
    })
}


module.exports = {addOrder, getOrder, getOrders};
