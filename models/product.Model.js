const mongoose = require('mongoose');
const Joi = require('joi');

// Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [2, "Product name must be at least 2 characters"],
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price must be a positive number"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"]
    },
    stock: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        trim: true,
        required: [true, "Product image URL is required"]
    }
}, { timestamps: true });

// Joi Validation Function
const validateProduct = (data) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(100).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().required(),
        stock: Joi.boolean().default(true),
        description: Joi.string(),
        image: Joi.string().trim().uri().required()
    });

    return schema.validate(data);
};

// Export Model & Validation Function
const ProductModel = mongoose.model("Product", productSchema);
module.exports = { ProductModel, validateProduct };
