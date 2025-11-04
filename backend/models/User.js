import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true   
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true  
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false
    },
    avatar:{
        type:String,
        default:""
    },
    isPro:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema);

export default User;