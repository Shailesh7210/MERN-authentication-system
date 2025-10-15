const mongoose = require('mongoose');

// Use Schema with capital S
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // optional: adds createdAt, updatedAt

// First param 'User' = model name, collection will be 'users'
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
