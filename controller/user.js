import User from './../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

//user signup
export const signup = async (req , res) => {
    try{
        const body = req.body;
        const {email , password} = body;
        if(req.file?.filename){
            body.image = req.file.filename;
        }
        //check if user exsist
        const user = await User.findOne({email});
        if(user) throw {status:403 , message : 'user is already exsist'};
        //hash password
        const hash = await bcrypt.hash(password , 10);
        if(hash) {body.password = hash}
        else throw {status:408 , message : 'there is unexpected error'};
        //create user
        const newUser = new User(body);
        await newUser.save();
        //creat token
        const token = jwt.sign({userId: newUser._id , userRole: newUser.role} , process.env.token , {expiresIn : '2h'});
        res.status(201).json({user: newUser , token})
    } catch(error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}
//////////////////

//user login
export const login = async (req , res) => {
    try{
        const {username , email , password} = req.body;
        //check user is exsist by user or email
        const user = await User.findOne({
            $or: [{email} , {username}]
        });
        if(!user) throw {status:401 , message : 'Invalid Email or Password'};
        //get hashed password amd check if password is correct
        const same = await bcrypt.compare(password , user.password );
        if(!same) throw {status:401 , message : 'Invalid Email or Password'};
        //creat token
        const token = jwt.sign({userId: user._id , userRole: user.role} , process.env.token , {expiresIn : '2h'});
        res.status(200).json({user , token})
    } catch(error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

//////////////////

//account update
export const accountUpdate = async (req , res) => {
    try{
        //user id check
        const {id:_id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(_id)) throw ({status:400 , message : 'invalid id'})
        const body = req.body;
        if(req.file?.filename){
            body.image = req.file.filename;
        }
        //get and updat user
        let user = await User.findByIdAndUpdate(_id , body);
        if(!user) throw {status:404 , message : 'user is not exsist'};
        user = {...user._doc , ...body}
        //creat token
        const token = jwt.sign({userId: user._id ,userRole: user.role} , process.env.token , {expiresIn : '2h'});
        res.status(200).json({user , token})
    } catch(error) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}