const mongoose = require('mongoose');
const Joi = require('joi');

// Delivery Schema
const deliverySchema = new mongoose.Schema({
    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "order", 
        required: [true, "Order reference is required"] 
    },
    deliveryBoy: { 
        type: String, 
        required: [true, "Delivery Boy name is required"], 
        trim: true 
    },
    status: { 
        type: String, 
        enum: ["pending", "shipped", "delivered", "cancelled"], 
        default: "pending", 
        required: true 
    },
    trackingURL: { 
        type: String, 
       
    },
    approxDeliveryTime: { 
        type: Number, 
        required: [true, "Approximate delivery time is required"], 
        min: [1, "Delivery time must be at least 1 hour"], 
        max: [168, "Delivery time cannot exceed 7 days (168 hours)"] 
    }
}, { timestamps: true });




// Joi Validation Function
const validateDelivery = (data) => {
    const schema = Joi.object({
        order: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).message("Invalid Order ID"),
        deliveryBoy: Joi.string().trim().required().min(3).max(50),
        status: Joi.string().valid("pending", "shipped", "delivered", "cancelled").required(),
        trackingURL: Joi.string().uri().message("Invalid Tracking URL"),
        approxDeliveryTime: Joi.number().min(1).max(168).required()
    });

    return schema.validate(data);
};


// Export Model & Validation Function
const DeliveryModel = mongoose.model('Delivery', deliverySchema);
module.exports = { DeliveryModel, validateDelivery };
