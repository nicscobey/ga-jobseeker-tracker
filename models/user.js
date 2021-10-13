const mongoose = require('./connection');
require("dotenv").config();

const { Schema, model } = mongoose;
const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        accountType: { type: String, default: "Student", required: true },
        course: String
    },
    {
        timestamps: true
    }
)

const User = model('User', userSchema);

module.exports = User;