const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authenticate = require('./api/middleware/authenticate');

mongoose.connect('mongodb+srv://mystore-riz:mystore@cluster0-axd8v.mongodb.net/mystore?retryWrites=true&w=majority', {useNewUrlParser: true});

const adminRoutes = require('./api/routes/admins');
const categoryRoutes = require('./api/routes/categories');
const userRoutes = require('./api/routes/users');
const productRoutes = require('./api/routes/products');
const cartItemRoutes = require('./api/routes/cartItems');

app.use(cors());
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/category', categoryRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', authenticate, cartItemRoutes);


module.exports = app;