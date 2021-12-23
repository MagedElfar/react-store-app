import mongoose from "mongoose";

const schema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId , ref:"user"},
    products: [{
        id:{type: mongoose.Schema.Types.ObjectId , ref:"product"},
        quantity: {type: Number}
    }],
    address: {type: String},
    amount: {type: Number},
    status: {type: String , default:'pending'}
} , {timestamps: true})

const Order = mongoose.model('order' , schema);

export default Order;