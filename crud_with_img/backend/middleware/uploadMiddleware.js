// What is multer?
// Multer is Node.js middleware used in express.js application to handle file uploads

// In simple words:
// When a user upload an image or file from the React frontend, Multer helps the Express backend to
// receive and process that file
const multer = require("multer");

// Use memory storage to upload image buffer in the Cloudinary
const storage = multer.memoryStorage();

// File filter to ensure only image files are accepted
const fileFilter = (req, file, cb) => {
    // In multer, cb stands for callback function

    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter,
});

module.exports = upload;