const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/EIA');

const user_schema = new Schema({
    name: String,
    lastname: String, 
    cedula: Number,
    email: String,
    password: String
});

const User = mongoose.model('User', user_schema);

module.exports.User = User;