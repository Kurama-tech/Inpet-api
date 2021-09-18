const dotenv = require('dotenv').config();
const moongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URL;
moongoose.connect(DB_URL);

var db = moongoose.connection;

const UsersSchema = moongoose.Schema({
    name: String
});

module.exports.db = moongoose;
module.exports.users = moongoose.model('users', UsersSchema);