const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const app = express();
const products = require('./routes/api/productRoutes');
const orders = require('./routes/api/orderRoutes');
const user = require('./routes/api/userRoutes');
// const food = require('./routes/api/foodRoutes');
// const drinks = require('./routes/api/drinkRoutes');
const cart = require('./routes/api/cartRoutes');
const dotenv = require('dotenv');
dotenv.config();
const publicPath = path.join(__dirname, 'frontend', 'build');
const port = process.env.PORT || 5000;

//connect to database
mongoose.connect("mongodb://localhost:27017/The-Gourmet-Tavern",{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
     .then(() => console.log("database connected"))
     .catch(err => console.log(err));

app.use(express.static(publicPath));
app.use(express.json());

app.use('/user', user);
app.use('/products', products);
app.use('/orders', orders);
// app.use('/food', food);
// app.use('/drinks', drinks);
app.use('/cart', cart);


app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});


//app.use('/products', require('./routes/api/productRoutes'));
//app.use('/orders', require('./routes/api/orderRoutes'));


app.listen(port, () => {
   console.log('Server is up!');
});