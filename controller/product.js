import Product from "../model/product.js";
import slugify from "slugify";
import mongoose from 'mongoose';
import Category from './../model/category.js'

//get product
export const getProduct = async (req , res) => {
    try {
        let count = await Product.countDocuments();
        count = Math.ceil(count / 9);
        const products = await Product.find({} , {} , {
            limit: 9 ,
            // skip: 4 * (page-1),
            sort:{
                createdAt: -1
            }
        }).populate("vendor").populate("category").populate('rating.users.id');
        res.status(200).json({products});
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//get product pagination
export const getProductagination = async (req , res) => {
    try {
        const {page , slug} = req.params;
        if(slug == "all"){
            let count = await Product.countDocuments();
            count = Math.ceil(count / 9);
            const products = await Product.find({} , {} , {
                limit: 9 ,
                skip: 9 * (page-1),
                sort:{
                    createdAt: -1
                }
            }).populate("vendor").populate("category").populate('rating.users.id');
            res.status(200).json({products , count});
        } else {
            const cat = await Category.findOne({slug})
            let count = await Product.countDocuments({category: cat._id});
            count = Math.ceil(count / 9);
            const products = await Product.find({category: cat._id } , {} , {
                limit: 9 ,
                skip: 9 * (page-1),
                sort:{
                    createdAt: -1
                }
            }).populate("vendor").populate("category").populate('rating.users.id');
            res.status(200).json({products , count});
        }
    } catch (error) {
        console.log(error.mdssage)
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//add product
export const addProduct = async (req , res) => {
    try{
        const size = JSON.parse(req.body?.size);
        const gender = JSON.parse(req.body?.gender);
        const body = {...req.body , size , gender};
        body.slug = slugify(req.body?.name);
        if(req?.files.length > 0){
            const images = req.files.map(item => item.filename);
            body.image = images
        }
        const newProduct = new Product(body);
        const product = await newProduct.save();
        res.status(201).json({product});
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//update product
export const updateProduct = async (req , res) => {
    const {id:_id} = req.params;
    try{
        const size = JSON.parse(req.body?.size);
        const gender = JSON.parse(req.body?.gender);
        const body = {...req.body , size , gender};
        if (!mongoose.Types.ObjectId.isValid(_id)) throw ({status:400 , message : 'invalid id'})
        body.slug = slugify(req.body?.name);
        if(req?.files.length > 0){
            const images = req.files.map(item => item.filename);
            body.image = images
        }
        body.slug = slugify(req.body?.name);
        const product = await Product.findByIdAndUpdate(_id , body , {new: true}).populate("vendor").populate("category");
        res.status(201).json({product})
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//delete product
export const deleteProduct = async (req , res) => {
    const {id:_id} = req.params;
    try{
        if (!mongoose.Types.ObjectId.isValid(_id)) throw ({status:400 , message : 'invalid id'});
        await Product.deleteOne({_id})
        res.status(200).json("product is deleted");
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//product rating
export const productRating = async (req , res) => {
    try{
        const {id:_id} = req.params;
        const userId = req.userId;
        const {rate:star , comment} = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) throw ({status:400 , message : 'invalid id'});
        const product = await Product.findById(_id);
        let {rating:{users , rate}} = product;
        
        //check if user review before
        if(users.some(item => item.id == userId)){
            users = users.map((item) => {
                console.log(item.id)
                if(item.id == userId){
                    item.star = star;
                    if(comment){
                        item.comment = comment
                    }
                    return(item)
                } else {
                    return item
                }
            })
        } else {
            console.log("fallse")
            users.push({
                id:userId,
                star,
                comment
            })
        }
        
        //calculate stars ber user
        const rateBYstar = users.reduce((obj , item) => {
            if(!obj[item.star]){
                obj[item.star] = 0
            }
            obj[item.star] ++;
            return obj
        } , {});
        
        //get avrage rating
        let sum = 0;

        for (let i = 1; i <= 5 ; i++) {
            if(!rateBYstar[i]) continue;
            sum += rateBYstar[i] * i
        }
        rate = sum/(users.length);
        product.rating = {users , rate};
        //update product
        await Product.updateOne({_id} , product);
        res.status(200).json({product});
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}