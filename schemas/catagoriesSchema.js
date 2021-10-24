const moongoose = require('mongoose');

const CategoriesSchema = moongoose.Schema({
    name: String,
    SubCat: Array,
})

module.exports.CategoriesSchema = CategoriesSchema;