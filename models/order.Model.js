const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    user:{
        
     type:mongoose.Schema.Types.ObjectId,
     ref:"user"
    },
    product:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
       },

    totalprice:Number,
    address:String,
    status:String,
    payment:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment"
       },

    delivery:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"delivery"
       }   

})

module.exports = mongoose.model("order",orderSchema)