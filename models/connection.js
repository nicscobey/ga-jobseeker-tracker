require('dotenv').config();
const mongoose = require('mongoose');

const DATABASE_URI = process.env.DATABASE_URI;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URI, CONFIG);

mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error))

module.exports = mongoose;