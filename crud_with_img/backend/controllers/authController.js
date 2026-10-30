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
    //jwt.sign() -> ek naya token generate hoga
     return jwt.sign({id}, process.env.JWT_SECRET, {
    //     "7d" ka matlab token 7 days baad expire hojaye
        expiresIn: "7d"
    });
};

// Register a new User:
const register = async(req, res) => {
    try{
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
        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        const verificationUrl = `${clientUrl}/verify-email?token=${verificationToken}`;

        const messageHtml = `
        <h2>Welcome, ${user.name}!</h2>
        <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}" target="_blank" style="display:inline-block; padding:10px 20px; 
        background-color: #007bff; color:white; text-decoration:none; border-radius:4px;">
            Verify Email Address.
        </a>
        <p>or copy and paste this link into your browser</p>
        <p>${verificationUrl}</p>
        <p>This link will be expire in 24 hours</p>

        `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Verify your Email Address",
                html: messageHtml,
                text: `Please verify your email using this link: ${verificationUrl}`
            });
        } catch (emailError) {console.error("Failed to send verification email", emailError.message);
        return res.status(201).json({
            message:
            "Registration successful, but there was an issue sending the verification email, Please contact support or check SMTP settings."
        })
    }

    return res.status(201).json({
        message: "Registration successful, Please check your email and verify your account"
    })
    }catch(error){
        console.error("Register Error", emailError.message);
        return res.status(500).json({message: "Server Error during registration"})
    }

}   
        
//Verify user email:
// @route GET/API/auth/verify-email/:token
const verifyEmail = async (req, res)=>{
    try {
        const {token} = req.params;

        if(!token){
            return res.status(400).json({message: "Verification token is required"})
        }

        //Find user with matching token and unexpired date:
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: {$gt: Date.now()},
        })

        if(!user){
            return res.status(400).json({
                message: "Invalid or expired verification token",
            })
        }
        //Makr user as verified and clear token
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        return res.status(200).json({
            message: "Email verified successfully",
        })
    }catch(error){
        console.error("Verify Email Error", error.message);
        return res.status(500).json({message: "Server error during email verification"})
    }
}   


//Login User:
//@route POST/api/auth/login

const login = async(req, res)=>{
    try{
        const{email, password}= req.body;
        //Validate fields:
        if(!email || !password){
            return res.status(400).json({message: "Please provide both email and password"})
        }

        //Check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Invalid email or password"})
        }

        //verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"})
        }

        //Check if email is verified
        if(!user.isVerified){
            return res.status(403).json({message: "Please verify your email before logging in"})
        }
        
    //Generate token and return user details
        const token = generateToken(user._id)

        return res.status(200).json({
            message: "Login Successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })

    }catch(error){
        console.error("Login Error", error.message);
        return res.status(500).json({message: "Server Error during login"})
    }
}

module.exports = {
    register,
    verifyEmail,
    login
};