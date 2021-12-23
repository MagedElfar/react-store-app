import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {type: String , lowercase: true , trim: true , require: true , require: true} ,
    slug: {type: String , trim: true , require: true , unique: true , lowercase: true},
    vendor: {type: mongoose.Schema.Types.ObjectId , ref:"user"},
    description: {type: String},
    size: {type: [String] },
    gender: {type: [String] },
    category: {type: mongoose.Schema.Types.ObjectId , ref:'category'},
    stock: {type: Number , default:0},
    price: {type: Number , default: 0},
    sale: {type: Number , default: 0},
    image: {type: [String]},
    rating: {
        rate: {type:Number , default: 0},
        users: [
            {
                id: {type: mongoose.Schema.Types.ObjectId , ref:"user"},
                star: {type:Number , enum: [1 , 2 , 3 , 4 , 5]},
                comment: String,
                data: {
                    type: Date,
                    default: Date.now()
                }
            }
        ]
    }
} , {timestamps: true})

const Product = mongoose.model('product' , schema);

export default Product;