const moongoose = require('mongoose');

const InventorySchema = moongoose.Schema({
    Date: String,
    Name: String,
    PO: String,
    BillNo: String,
    BDate: String,
    TotalNumberEntries: Number,
    EntryNumber: Number,
    Category: String,
    SubCat: String,
    Termination: String,
    Package: String,
    PartNo: String,
    Make: String,
    Description: String,
    Value: String,
    Comments: String,
    Quantity: Number,
    TotalQATM: Number
})

module.exports.InventorySchema = InventorySchema;