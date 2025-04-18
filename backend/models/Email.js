const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema(
    {
        userid:
        {
            type: String,
            require: true,
            unique: true
        },
        email:
        {
            type: String,
            require: true,
            unique: true
        },
        server:
        {
            type: Number
        }
    }
);

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;