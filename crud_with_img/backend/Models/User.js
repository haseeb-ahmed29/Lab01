const mongoose = require("mongoose");
const { timeStamp } = require("node:console");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,               //Name must be text
            required: [true, "Name is required"],  //Name is compulsory
            //Example: Remove extra space from the beginning and end:
            //Ali --->     Ali
            trim: true
        },

        email: {
            type: String,               //Name must be text
            required: [true, "Email is required"], //Name is compulsory
            //Example: Remove extra space from the beginning and end:
            unique: true,
            lowercase: true,
            //Ali --->     Ali
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        },
        isVerified:{
            type:Boolean,
            default:false,

        },
        verificationToken:{
            type:String,
        },
        verificationTokenExpiry:{
            type:Date,
        },
},
//Automatically add createdAt and uppdatedAt fields
    {
        timeStamps: true,        
    }
)

module.exports = mongoose.model("User",userSchema)