const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

const addCart = async (req, res)=>{

    const {productId, quantity} = req.body;

    const userId = '67ac4d3a57cfa167715c2304';

    const cart = await Cart.create({user: userId, products: [{ product: productId, quantity: quantity }]});

    res.status(200).json({
        success: true, 
        cart
    });
}  


const getCart = async (req, res)=>{

    const userId = '67ac4d3a57cfa167715c2304';

    const cart = await Cart.findOne({ user: userId })
            .populate('products.product', 'name price imageUrl') // Get product details
            .populate('user', 'name email'); // Get user details

    if(!cart){
        return res.status(301).json({
            success: false, 
            message: "Cart not have any items yet"
        });
    }

    res.status(200).json({
        success: true, 
        cart
    });
}



const updateCart = async (req, res)=>{

    try {
        const cartId = req.params.id;  // Cart ID from URL
        const { productId, quantity } = req.body;  // Extract product ID & new quantity

        const cart = await Cart.findOneAndUpdate(
            { _id: cartId, "products.product": productId }, // Find cart & product inside it
            { $set: { "products.$.quantity": quantity } }, // Update quantity
            { new: true } // Return updated document
        ).populate('products.product', 'name price'); // Populate product details

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart or product not found",
            });
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating cart",
            error: error.message
        });
    }
}


const removeCartItem = async (req, res)=>{

    try {
        const cartId = req.params.id;  // Cart ID from URL
        const { productId } = req.body;  // Extract product ID & new quantity

        const cart = await Cart.findOneAndDelete(
            { _id: cartId, "products.product": productId }, // Find cart & product inside it
        )

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart or product not found",
            });
        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating cart",
            error: error.message
        });
    }
}



module.exports = {addCart, getCart, updateCart, removeCartItem}; 