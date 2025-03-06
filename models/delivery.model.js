const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({

    order:{
        
     type:mongoose.Schema.Types.ObjectId,
     ref:"order"
    },
   deliveryboy:String,
   status:String,
   treackingURL:String,
   approxdeliverytime:Number

})

module.exports = mongoose.model("delivery",deliverySchema)