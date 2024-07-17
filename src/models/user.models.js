import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required:true,
        unique:true,
    },
    email : {
        type : String,
        required:true,
        unique:true,
    },
    password:{
        type : String,
        required:true,
    },
    isVerified : {
        type : Boolean,
        default:false,
    },
    isAdmin:{
        type: Boolean,
        default:false,
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date,
})

const User = mongoose.models.users || mongoose.model("users",       // cause of edge in nextjs mongoose.models.users
    userSchema)

export default User;