//dependencies
const mongoose = require('./connection');

const { model, Schema } = mongoose;

const ContactSchema = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: String,
        email: String,
        linkedIn: String,
        phone: String,
        employer: String,
        firstContact: Date,
        latestContact: Date,
        notes: String,
        myEmail: String
    },
    {
        timestamps: true
    }
)

const Contact = model('Contact', ContactSchema)

module.exports = Contact;