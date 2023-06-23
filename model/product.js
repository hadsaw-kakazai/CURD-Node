const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductSchema = new Schema({
    id:String,
    name:String,
    price:Number,
    qty:Number,
    desc:String
})

module.exports = mongoose.model('product',ProductSchema)
//product is collection name