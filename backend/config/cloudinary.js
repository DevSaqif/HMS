const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2;

// Load environment variables from .env file
dotenv.config();

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY  // Ensure this matches your .env file
    });
    console.log("Cloudinary configured successfully");
};

// Call the configuration function
connectCloudinary();

// Test upload from a public URL
cloudinary.uploader.upload("https://www.example.com/path-to-image.jpg", { 
    folder: "prescripto", 
    public_id: "test_image" 
}, (error, result) => {
    if (error) {
        console.error("Upload failed:", error);
    } else {
        console.log("Upload successful:", result);
    }
});

module.exports = connectCloudinary;
