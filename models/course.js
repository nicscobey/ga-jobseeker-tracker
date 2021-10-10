const mongoose = require('./connection');
require('dotenv').config();
const Student = require('./user')

const { Schema, model } = mongoose;
const courseSchema = new Schema(
    {
        courseName: {type: String,required: true },
        // students: [Student],
        email: String
    },
    {
        timestamps: true
    }
)

const Course = model('Course', courseSchema);
module.exports = Course;