import mongoose from "mongoose";
import jwt from "jsonwebtoken";
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
    },
    avatar:{
        type:String,
        default:""
    },
    isPro:{
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String,
    }
},{
    timestamps:true
})

// Middelware to hash password before saving
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })
}


const User = mongoose.model("User",userSchema);

export default User;