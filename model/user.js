import mongoose from 'mongoose';

const schema = mongoose.Schema({
    firstName: {
        type: String,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: String,
    role: {
        type: String,
        default: 'customer'
    },
    phone: String,
    address: String,
    image: {
        type: String,
        default: 'avatar.png'
    }
} , {timestamps: true})

const User = mongoose.model('user' , schema);

export default User;