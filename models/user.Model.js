const mongoose = require('mongoose')


const addressSchema= new mongoose.Schema({
    state:String,
    zip:Number,
    city:String,
    address:String
});

const userSchema= new mongoose.Schema({
    name: String,
    email:String,
    password: String,
    phone: Number,
    addresses: [addressSchema],},
    {
timestamps:true
}

)

module.exports= mongoose.model('user',userSchema);