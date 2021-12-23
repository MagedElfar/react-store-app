import Cart from '../model/cart.js';
import mongoose from 'mongoose';

//get carts
export const getUserCarts = async (req , res) => {
    try {
        const {id:userId} = req.params;

        const carts = await Cart.find({userId}).populate("productId");
        res.status(200).json({result:carts})

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//add or update cart
export const addToCart = async (req , res) => {
    try {
        const {userId , productId , quantity} = req.body;

        let cart = await Cart.findOne({userId , productId});
        if(cart) {
            await Cart.updateOne({_id: cart._id} , {quantity});
            cart = await Cart.findOne({_id:cart._id}).populate("productId")
            res.status(201).json({result:cart , updated: true})
        } else {
            const newCart = new Cart(req.body);
            cart = await newCart.save();
            cart = await Cart.findOne({_id:cart._id}).populate("productId")
            res.status(201).json({result: cart , updated: false})
        }

    } catch (error) {
        console.log(error.message)
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//delte cart
export const deltCart = async (req , res) => {
    try {
        const {id:_id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) throw ({status:400 , message : 'invalid id'});

        await Cart.deleteOne({_id});
        res.status(200).json("product is deleted");
        

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//delet user cart after paument
export const clearUserCarts = async (req , res) => {
    try {
        await Cart.deleteMany({userId: req.userId});
        res.status(200).json("product is delted")
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}