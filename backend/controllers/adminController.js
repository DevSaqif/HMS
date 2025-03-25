const Validator = require("validator");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const doctorModel = require("../models/doctorModels");

// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imagefile = req.file;

        // Checking for all data to add doctors 
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        // Validating email
        if (!Validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validating strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password (min 8 characters)" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check for image file
        if (!imagefile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Parse address
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (error) {
            return res.status(400).json({ success: false, message: "Invalid address format" });
        }

        // Prepare doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            date: Date.now()
        };

        // Save to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor added successfully", data: newDoctor });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { addDoctor };
