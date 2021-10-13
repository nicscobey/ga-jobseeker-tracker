const mongoose = require('./connection');
require('dotenv').config();

const { Schema, model } = mongoose;
const appSchema = new Schema(
    {
        title: { type: String, required: true },
        employer: { type: String, required: true },
        jobDescription: String,
        dateApplied: { type: Date, required: true },
        status: { type: String, default: "Applied", required: true },
        notes: String,
        email: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const App = model('App', appSchema);

module.exports = App;