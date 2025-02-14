const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { use } = require("../routes/auth.route");

const register = async (req, res)=>{

    const {name, email, password, isAdmin} = req.body;

    const isUser = await User.findOne({email});

    if(isUser){
        return res.status(401).json({
            success: false,
            message: "User already present",
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({name, email, password: hashPassword, isAdmin});
    const user = await User.findOne({email}, {name:1, email:1, isAdmin:1});
    res.status(200).json({
        success: true, 
        user
    });
}  
 
const login = async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.status(301).json({
            success: false,
            message: "User not exist"
        })
    }

    const checkPassword = await bcrypt.compare(password, user.password);


    if(!checkPassword){
        return res.status(301).json({
            success: false,
            message: "Incorrect Username or password"
        })
    }

    const token = jwt.sign({user}, "secret_key", {expiresIn: '2d'});

    res.cookie('token', token)
    .status(200)
    .json({
        success: true,
        token,
        user
    })
}

const profile = async (req, res)=>{
    const id = req.userId;
    const user = await User.findById(id);
    console.log(user);

    if(!user){
        res.json({
            success: false,
            message: "Unable to get User"
        })
    }

    res.status(200).json({
        success: true,
        user
    });
}


const isAuth = async (req, res, next)=>{
    const token = req.cookies.token;

    const verifyToken = await jwt.verify(token, 'secret_key');
    console.log(verifyToken)
    if(verifyToken){
        req.userId = verifyToken.user._id;
        console.log(req.userId)
        next();
    }
    else{
        res.status(200).json({
            success: false,
            message: "Token not verified"
        });
    }
}


const isAdmin = async (req, res, next)=>{

    const id = req.userId;
    const user = await User.findById(id);
    if(user.isAdmin){
        req.admin = true;
        next();
    }
    else{
        res.status(200).json({
            success: false,
            message: "Only admin have this permission"
        });
    }
}


module.exports = {register, login, profile, isAuth, isAdmin};