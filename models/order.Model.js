const mongoose = require('mongoose');
const Joi = require('joi');

// Order Schema
const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        required: [true, "User reference is required"] 
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "product", 
        required: [true, "Product reference is required"] 
    },
    totalprice: { 
        type: Number, 
        required: [true, "Total price is required"], 
        min: [1, "Total price must be greater than zero"] 
    },
    address: { 
        type: String, 
        required: [true, "Delivery address is required"], 
        trim: true 
    },
    status: { 
        type: String, 
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"], 
        default: "pending", 
        required: true 
    },
    payment: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "payment" 
    },
    delivery: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "delivery" 
    }
}, { timestamps: true });



// Joi Validation Function
const validateOrder = (data) => {
    const schema = Joi.object({
        user: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).message("Invalid User ID"),
        product: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).message("Invalid Product ID"),
        totalprice: Joi.number().min(1).required(),
        address: Joi.string().trim().required().max(255),
        status: Joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled").required(),
        payment: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null, "").optional(),
        delivery: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null, "").optional()
    });

    return schema.validate(data);
};

// Export Model & Validation Function
const OrderModel = mongoose.model('Order', orderSchema);
module.exports = { OrderModel, validateOrder };
