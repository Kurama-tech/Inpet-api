const moongoose = require('mongoose');

const TerminationSchema = moongoose.Schema({
    name: String,
})

const PackageSchema = moongoose.Schema({
    name: String,
})

module.exports.TerminationSchema = TerminationSchema;
module.exports.PackageSchema = PackageSchema;