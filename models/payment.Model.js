const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({

    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order"
    },
    amount:Number,
    method:String,
    status:String,
    transactionID:String
})

module.exports = mongoose.model("payment",paymentSchema)