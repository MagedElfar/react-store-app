import mongoose from "mongoose";

const schema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId},
    productId: {type: mongoose.Schema.Types.ObjectId , ref:"product"},
    quantity: {type:Number}
} , {timestamps: true})

const Cart = mongoose.model('cart' , schema);

export default Cart;