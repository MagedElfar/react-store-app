//import modules
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import path , {dirname} from 'path';
import {fileURLToPath } from 'url';

//router import
import user from './router/user.js';
import category from './router/category.js';
import product from './router/product.js';
import cart from './router/cart.js';
import stripe from './router/stripe.js';
import order from "./router/order.js";

//Server setup

config();
const PORT = process.env.PORT || 3001;
const CONNECTION_URL = process.env.CONNECTION_URL;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname , 'images')));
app.use('/images' , express.static('images'));
app.get('/' , (req , res) => {res.send('Hello to our store app')});

app.use(express.urlencoded({extended: true}) , express.json());

//routers
app.use('/user' , user);
app.use('/category' , category);
app.use('/product' , product);
app.use('/cart' , cart);
app.use('/order' , order);
app.use('/checkout' , stripe);

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
})

//create server & concted
mongoose.connect(CONNECTION_URL).then(() => {
    app.listen(PORT , (() => {
        console.log(`Server is listen on port ${PORT}...`)
    }))
})