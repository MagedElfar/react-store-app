import express from 'express';
import { getProduct , addProduct , updateProduct , deleteProduct , productRating , getProductagination} from './../controller/product.js';
import {uploader} from './../middleware/multer.js';
import userAuth from './../middleware/userAuth.js';
import adminAuth from "./../middleware/adminAuth.js";
import { productValidation , isValidate } from "./../middleware/validation.js";

const router = express.Router();

//get product
router.get('/' , getProduct);
router.get('/:slug/:page' , getProductagination);

//add product
router.post('/add' , uploader("products").array("image" , 7) , productValidation , isValidate , addProduct);

//update product
router.patch('/:id' , userAuth , adminAuth , uploader("products").array("image" , 7) , productValidation , isValidate , updateProduct);

//delete product
router.delete('/:id' , userAuth , adminAuth , deleteProduct);

//product rating
router.patch('/rate/:id' , userAuth , productRating);

export default router;