const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("DB connected successfully")
})
.catch((e)=>{
    console.log("DB not connect")
})

module.exports = connectDB;