//what is Multer?
//Multer is Node.js middleware used in express.js application to handle file uploads 

//In simple words:
// when a user upload an image or file for the react  frontend, Multer helps the Express beckend to receive and process that file 

const multer = require("multer")

//Use memory storage to upload image buffer in the cloudinary 
const storage = multer.memoryStorage();

//File filter to ensure only image files are accepted
const fieFilter = (req, file, cb)=>{
    //In multer, cb stands for callback function
    

    if(file.minetype.startswith("image/")){

        cb(null, true);
    }else{
        cb(new Error("only image files are allowed"), false)

    }

}

const upload= multer({
    storage,
    limits:{fileSize: 5 * 1024 * 1024}, //5MB max
    fileFilter,

})

module.exports = upload;