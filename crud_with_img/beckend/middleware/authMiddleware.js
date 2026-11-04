const jwt = require("jsonwebtoken");
const User = require("../models/User")

const protect = async(req, res, next)=>{

    let token;

    //Bearer is an authentication scheme used in HTTP requests to send an access token (JWT) from
    //the client to server

    //Example
    //When the user logs in successfully, the backend generates a JWT token
if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
) {
    //Authorization header is present and contains a Bearer token
    try {
        //Extract token from "Bearer <your-jwt-token>"
        //split the Authorization header using a space (" ") as the separator
        //Example: "Bearer abc123xyz" become ["Bearer", "abc123xyz"]

        token = req.headers.authorization.split(" ")[1]

        //verify token:
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //Find user by id from decoded token(exclude password)
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({message: "User not found"});
        }

        req.user = user;
        //next() means "My current middleware work is completed. Now move to the next function"
        next();
        }catch(error){
            console.error(`JWT Auth Error: ${error.message}`)
            return res.status(401).json({message: "Not authorized, Invalid token"})
        }
    }else{
        return res.status(401).json({message: "Not authorized, no token provided"})
    }
}
module.exports= { protect};