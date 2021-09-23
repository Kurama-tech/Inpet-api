const moongoose = require('mongoose');

const inventrySchema = moongoose.Schema({
    Category: String,
    ComponentDesc: String,
    PartNo: String,
    Make: String,
    Date: Date,
    Supplier: String,
    Qty: String,
    value: String
});

module.exports.inventrySchema = inventrySchema;