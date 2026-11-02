// Node.js builtin module hai.
// Iska use values ko secure and random hashing use hota for cryptographic operation k liye
const crypto = require("crypto")

//Password ko hash krne krne aur password verify karne k liye, ye original database m save nahi hoga
const bcrypt = require("bcryptjs")

//JWT(Json Web Token) generate aur verify krne k liye..
const jwt = require("jsonwebtoken")

//Login k bad user ki identity verify krne k liye use karna
const User = require("../Models/User");

const sendEmail = require("../utils/sendEmail")

// Helper function to generate JWT:
const generateToken = (id) => {
    //jwt.sign() ---> ek naya token generate hoga
    return jwt.sign({id}, process.env.JWT_SECRET, {
        // "7d" ka matlab token 7 days bad expire hojaye
        expiresIn: "7d"
    });
};

// Register a new User:
const register = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        // Validate fields
        if(!name || !email || !password){
            return res.status(400).json({message: "Please provide all required fields"});
        }

        //Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "An Account with this email already exists"});
        }
 // Hash Password(Password ko secure format main convert krdo)
//Salt password hashing ko zyada secure bana dengay:
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Generate verification token and expiry(24 hours)
const verificationToken = crypto.randomBytes(32).toString("hex");

// Date.now() current time ko mili seconds m convert krdo
const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

//Create User:
const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isVerified: false,
    verificationToken,
    verificationTokenExpiry 
})
//Send Verification Email:
const clienturl = process.env.CLIENT_URL || "http://localhost:5173";
const verificationUrl = `${clienturl}/verify-email?token=${verificationToken}`;

const messageHtml = `
<h2>Welcome, ${user.name}!</h2>
<p>Thank for you signing up. Please verify your email by clicking the link below:</p>
<a href="${verificationUrl}" target="_blank" style="display:inline-block; padding:10px 20px; background-color:#007bff; color:white; text-decoration:none; border-radius:4px;">
Verify Email Address.
</a>
`
}
}