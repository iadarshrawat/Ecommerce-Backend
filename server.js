const express = require('express');
const app = express();
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route');
const paymentRoute = require('./routes/payment.route');
const orderRoute = require('./routes/order.route');
const { default: connectDB } = require('./db/connectDB');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');


require('dotenv').config();
mongoose.set('debug', true);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/payments', paymentRoute)
app.use('/api/orders', orderRoute)




app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT} number`);
})