const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { use } = require("../routes/auth.route");

const register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Fill all the fields",
      });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      return res.status(401).json({
        success: false,
        message: "User already present",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashPassword, isAdmin });
    const user = await User.findOne(
      { email },
      { name: 1, email: 1, isAdmin: 1 }
    );
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error while register",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(301).json({
        success: false,
        message: "User not exist",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(301).json({
        success: false,
        message: "Incorrect Username or password",
      });
    }

    const token = jwt.sign({ user }, "secret_key", { expiresIn: "2d" });

    res.cookie("token", token).status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    return res.status(300).json({
      success: false,
      message: "Error occured when user login",
    });
  }
};

const profile = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id);
    console.log(user);

    if (!user) {
      res.json({
        success: false,
        message: "Unable to get User",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(300).json({
      success: false,
      message: "Error when access profile",
    });
  }
};

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    let verifyToken;
    try {
      verifyToken = jwt.verify(token, "secret_key");
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    console.log(verifyToken);

    // Ensure userId is correctly extracted
    if (verifyToken.user && verifyToken.user._id) {
      req.userId = verifyToken.user._id;
      console.log(req.userId);
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "User ID not found in token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const isAdmin = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findById(id);
    if (user.isAdmin) {
      req.admin = true;
      next();
    } else {
      res.status(200).json({
        success: false,
        message: "Only admin have this permission",
      });
    }
  } catch (error) {
    return res.status(300).json({
      success: false,
      message: "Only for admin",
    });
  }
};

module.exports = { register, login, profile, isAuth, isAdmin };
