import { check } from 'express-validator';
import { validationResult } from 'express-validator';

//check req
export const singupValidation = [
    check('username').not().isEmpty().withMessage('Username is required').custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username'),
    check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email format is invalid'),
    check('password').isLength({min: 6}).withMessage('password must be 6 character at least'),
]

export const updateValidation = [
    check('username').not().isEmpty().withMessage('Username is required').custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username'),
    check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email format is invalid')
]

//category-validation
export const categoryValodation = check("name").not().isEmpty().withMessage('Category name is required');

//product validation
export const productValidation = [
    check("name").not().isEmpty().withMessage('Product name is required'),
    check("price").not().isEmpty().withMessage('Product peice is required'),
    check("stock").not().isEmpty().withMessage('Product stock is required'),
    check("category").not().isEmpty().withMessage('Product category is required')
]

//check result
export const isValidate = (req , res , next) => {
    try {
        if(validationResult(req).isEmpty()){
            next();
        } else {
            const validation = validationResult(req).array().map(item => item.msg);
            throw {status:401 , message : validation};
        }
    } catch(error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}