import Category from "./../model/category.js";
import slugify from "slugify";
import mongoose from 'mongoose';

//creat list
const catList = (cats , id = null) => {
    const list = [];
    let cat = [];
    if(!id) {
        cat = cats.filter(item => !item.parentId) 
    } else {
        cat = cats.filter(item => item.parentId == id) 
    }
    cat.forEach(item => {
        list.push({...item._doc , cheldern: catList(cats , item._id) })
    });


    return list;
}

//Get categoties
export const getCategories = async (req , res) => {
    try{
        const categories = await Category.find({});
        if(categories.length === 0) throw {status:404 , message : 'categories are not found'};
        res.status(200).json({categories})
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//Add new category
export const addCat = async (req , res) => {
    try{
        const body = req.body;
        if(req.file?.filename){
            body.image = req.file.filename;
        }
        body.slug = slugify(req.body?.name);
        const newCat = new Category( body );
        await newCat.save()
        res.status(201).json({category: newCat})
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//Update category
export const updateCat = async (req , res) => {
    const {id:_id} = req.params;
    try{
        const body = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) throw ({status:400 , message : 'invalid id'})
        body.slug = slugify(req.body?.name);
        if(req.file?.filename){
            body.image = req.file.filename;
        }
        body.slug = slugify(req.body?.name);
        const category = await Category.findByIdAndUpdate(_id , body , {new: true})
        res.status(201).json({category})
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}
