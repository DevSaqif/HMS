const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("Database connected"));

    // Connect to the database
    await mongoose.connect(`${process.env.MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
