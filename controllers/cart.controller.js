const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const addCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const userId = req.userId;

    const cart = await Cart.create({
      user: userId,
      products: [{ product: productId, quantity: quantity }],
    });

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(300).json({
      success: false,
      message: "Error in addcart",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.userId;
console.log(userId)
    const cart = await Cart.findOne({ user: userId })
      .populate("products.product", "name price imageUrl") 
      .populate("user", "name email"); 

    if (!cart) {
      return res.status(301).json({
        success: false,
        message: "Cart not have any items yet",
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(300).json({
      success: false,
      message: "error in get product",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const cartId = req.params.id; 
    const { productId, quantity } = req.body; 

    const cart = await Cart.findOneAndUpdate(
      { _id: cartId, "products.product": productId }, 
      { $set: { "products.$.quantity": quantity } }, 
      { new: true } 
    ).populate("products.product", "name price"); 

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart or product not found",
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const cartId = req.params.id; 
    const { productId } = req.body; 

    const cart = await Cart.findOneAndDelete(
      { _id: cartId, "products.product": productId } 
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart or product not found",
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing cart",
      error: error.message,
    });
  }
};

module.exports = { addCart, getCart, updateCart, removeCartItem };
