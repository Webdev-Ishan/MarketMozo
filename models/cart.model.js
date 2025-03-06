const mongoose = require('mongoose');
const Joi = require('joi');

// Cart Schema
const cartSchema = new mongoose.Schema({
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
    }
}, { timestamps: true });

// Joi Validation Function
const validateCart = (data) => {
    const schema = Joi.object({
        user: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).message("Invalid User ID"),
        product: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).message("Invalid Product ID"),
        totalprice: Joi.number().min(1).required()
    });

    return schema.validate(data);
};

// Export Model & Validation Function
const CartModel = mongoose.model('Cart', cartSchema);
module.exports = { CartModel, validateCart };
