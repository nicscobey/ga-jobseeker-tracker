// const mongoose = require('mongoose');
const mongoose = require('./connection');
require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
// const User = require('./models/user.js')

const { Schema, model } = mongoose;
const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        accountType: { type: String, default: "Student", required: true },
        // apps: [
        //     {
        //         title: String,
        //         employer: String,
        //         jobDescription: String,
        //         dateApplied: Date,
        //         status: { type: String, default: "Applied" },
        //         notes: String
        //     }
        // ]
    },
    {
        timestamps: true
    }
)

const User = model('User', userSchema);

module.exports = User;