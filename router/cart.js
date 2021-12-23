import express from "express";
import {getUserCarts , addToCart , deltCart , clearUserCarts} from './../controller/cart.js'
import userAuth from './../middleware/userAuth.js';

const router = express.Router();

//get cart
router.get('/:id' , getUserCarts);

//add new cart
router.post('/add' , userAuth , addToCart);

//delte cart
router.delete('/:id' , userAuth , deltCart);

router.delete("/clear/:id" , userAuth , clearUserCarts)


export default router;
