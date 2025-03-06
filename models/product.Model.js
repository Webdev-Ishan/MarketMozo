const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    name:String,
    price:Number,
    category:String,
    stock:Boolean,
    description:String,
    image:String
});

module.exports = mongoose.model("user", ProductSchema)