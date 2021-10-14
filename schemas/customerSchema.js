const moongoose = require('mongoose');

const customerSchema = moongoose.Schema({
    SName: String,
    SID: {type: String, unique : true, required : true, dropDups: true},
    SEmail: String,
    SPhone: Number,
    SGSTIN: String,
    SAddress: {
        AddressLine: String,
        City: String,
        State: String,
        PinCode: String,
        Country: String
    },
    Contact: {
        Name: String,
        Email: String,
        No: Number
   },
    
    BankingDetails: {
       AccountNumber: String,
       BankName: String,
       AccountName: String,
       AccountType: String,
       IFSC: String
   },
   Nature: String

});

module.exports.customerSchema = customerSchema;