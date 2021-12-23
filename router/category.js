import express from "express";
import {addCat , getCategories , updateCat} from "./../controller/category.js";
import { isValidate , categoryValodation } from "./../middleware/validation.js";
import userAuth from './../middleware/userAuth.js';
import adminAuth from "./../middleware/adminAuth.js";
import { uploader } from "./../middleware/multer.js";

const router = express.Router();

//get categories
router.get('/' , getCategories);

//add new category
router.post('/add' , userAuth , adminAuth , uploader("categories").single("image")  , categoryValodation , isValidate , addCat);

//update category
router.patch('/:id' , userAuth , adminAuth , uploader("categories").single("image")  , categoryValodation , isValidate , updateCat);

export default router;
