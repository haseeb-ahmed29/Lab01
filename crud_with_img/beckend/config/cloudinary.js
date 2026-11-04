const cloudinary = require("cloudinary").v2;


cloudinary.config({

    cloud_name: Process.env.CLOUDINARY_CLOUD_NAME,
    api_key: Process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY,

});


Module.exports = cloudinary;
    













