const express = require("express");
const router = express.Router();
const { addDoctor } = require("../controllers/adminController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the folder where files will be saved (e.g., 'uploads' folder)
        cb(null, path.join(__dirname, '../uploads/')); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Add doctor route with file upload middleware
router.post("/add-doctor", upload.single('image'), addDoctor);

module.exports = router;
