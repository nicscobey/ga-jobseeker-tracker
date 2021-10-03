const mongoose = require('./connection');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const { Schema, model } = mongoose;
const appSchema = new Schema(
    {
        title: { type: String, required: true },
        employer: { type: String, required: true },
        jobDescription: String,
        dateApplied: { type: Date, required: true },
        status: { type: String, default: "Applied", required: true },
        notes: String,
        username: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const App = model('App', appSchema);

module.exports = App;