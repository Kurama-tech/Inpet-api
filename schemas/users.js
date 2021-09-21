const dotenv = require('dotenv').config();
const moongoose = require('mongoose');
const {supplierSchema} = require('./supplierSchema');
const {customerSchema} = require('./customerSchema');
const DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = process.env.MONGO_DB_NAME;

var options = {};
if(process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD){
    console.log('It is set! running in prod mode!');
    var USER = process.env.MONGO_USERNAME;
    var PASS = process.env.MONGO_PASSWORD;
    console.log(process.env.MONGO_USERNAME);
    options = {
        dbName: DB_NAME,
        user: USER,
        pass: PASS,
        keepAlive: true,
        keepAliveInitialDelay: 300000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
          
    }
} else {
    options = {
        dbName: DB_NAME 
    }
    console.log('Running in Dev mode');
}
async function connectDB(){
try {
    await moongoose.connect(DB_URL, {user: USER, pass: PASS }, function(error){
        throw error;
    });
    console.log('Connected Successfully');
    return moongoose.connection;
 } catch (error) {
    console.log('Error connecting to DB ::', error);
}
}

var db = connectDB();

const UsersSchema = moongoose.Schema({
    name: String
});

module.exports.db = moongoose;
module.exports.users = moongoose.model('users', UsersSchema);
module.exports.suppliers = moongoose.model('suppliers', supplierSchema);
module.exports.customers = moongoose.model('customers', customerSchema);