import express from 'express';
import { signup , login , accountUpdate} from './../controller/user.js';
import { uploader } from './../middleware/multer.js';
import userAuth from './../middleware/userAuth.js';
import { singupValidation , updateValidation , isValidate } from "./../middleware/validation.js";

const router = express.Router();

//signup
router.post('/signup' , singupValidation  , isValidate , signup);

//login
router.post('/login' , login);

//account update
router.patch('/:id' , userAuth , uploader("users").single('image') , accountUpdate);

export default router;