const Product = require("../models/product.model");

const createProduct = async (req, res)=>{

    try {
        const {name, description, price, stock, category, imageUrl} = req.body;
        const product = await Product.create({name, description, price, stock, category, imageUrl});
    
        res.status(200).json({
            success: true,
            product
        })  
    } catch (error) {
        return res.status(300).json({
            success: false,
            message: 'error in create product'
        })
    }
}

const getProducts = async (req, res)=>{

    try {
        const allProducts = await Product.find({});

    res.status(200).json({
        success: true,
        allProducts
    })
    } catch (error) {
        return res.status(300).json({
            success: false,
            message: 'Error in getProducts'
        })
    }
}

const getProduct = async (req, res)=>{

    try {
        const id = req.params.id;
    console.log(id);
    const product = await Product.find({_id: id});
    res.status(200).json({
        success: true,
        product
    })
    } catch (error) {
        return res.status(300).json({
            success: false,
            message: 'Error get Product'
        })
    }
}   

const updateProduct = async (req, res)=>{

    try {
        const id = req.params.id;

    const {name, description, price, stock, category, imageUrl} = req.body;
    const product = await Product.updateOne({_id: id}, {name, description, price, stock, category, imageUrl});

    res.status(200).json({
        success: true,
        product
    })
    } catch (error) {
        return res.status(300).json({
            success: false,
            message: "Error in updateProduct"
        })
    } 
}

const deleteProduct = async (req, res)=>{
    const id = req.params.id;
    const deleteProduct = await Product.deleteOne({_id: id});
    res.status(200).json({
        success: true,
        deleteProduct
    })
}

module.exports = {createProduct, getProduct, getProducts, updateProduct, deleteProduct};