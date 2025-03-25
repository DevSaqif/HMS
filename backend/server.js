const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/mongodb.js")
const connectCloudinary = require("./config/cloudinary.js");
const adminRouter = require("./routes/adminRoute");


// app config 

const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middleware 
app.use(express.json())
app.use(cors())


//api end points
app.use("/api/admin", adminRouter);
// localhost:4000/api/admin/add-doctor then only the code will run


app.get("/", (req,res)=>{
    res.send("api is working");
});

app.listen(port,()=> console.log("Server Started", port))