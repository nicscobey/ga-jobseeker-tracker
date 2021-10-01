const mongoose = require('./connection');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const { Schema, model } = mongoose;
const appSchema = new Schema(
    {
        title: String,
        employer: String,
        jobDescription: String,
        dateApplied: Date,
        status: { type: String, default: "Applied" },
        notes: String
    },
    {
        timestamps: true
    }
)

const App = model('App', appSchema);

module.exports = App;