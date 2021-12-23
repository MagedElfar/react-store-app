import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {type: String , lowercase: true , trim: true , require: true , require: true} ,
    slug: {type: String , trim: true , require: true , unique: true} ,
    parentId: {type: mongoose.Schema.Types.ObjectId , ref:'Category'},
    image : String
} , {timestamps: true})

const Category = mongoose.model('category' , schema);

export default Category;