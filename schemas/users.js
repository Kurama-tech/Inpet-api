const dotenv = require('dotenv').config();
const moongoose = require('mongoose');
const {supplierSchema} = require('./supplierSchema');
const {customerSchema} = require('./customerSchema');
const {CategoriesSchema} = require('./catagoriesSchema');
const {TerminationSchema, PackageSchema} = require('./terminationSchema');
const {InventorySchema} = require('./inventorySchema');
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
        authSource: 'inpet',
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
    var ConnectStr = DB_URL + DB_NAME
    if(process.env.CLOUD === true || process.env.CLOUD === 'true'){
        ConnectStr = DB_URL
    }
    console.log(ConnectStr);
    moongoose.connect(ConnectStr, options={useNewUrlParser: true, useUnifiedTopology: true} ,function(error) {
        if(error != undefined){
            console.log('Error connecting to DB ::', error);
        }
        else{
            console.log('Connected to DB Successfully');
        } 
    });
    return moongoose.connection;
 } catch (error) {
    if(error != null){
        console.log('Error connecting to DB ::', error);
    } 
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
module.exports.categories = moongoose.model('categories', CategoriesSchema);
module.exports.termination = moongoose.model('termination', TerminationSchema);
module.exports.package = moongoose.model('package', PackageSchema);
module.exports.inventory = moongoose.model('inventory', InventorySchema)