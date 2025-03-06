const mongoose = require('mongoose');
const Joi = require('joi');

// Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        unique: true,
        minlength: [2, "Category name must be at least 2 characters"],
        maxlength: [50, "Category name cannot exceed 50 characters"]
    }
}, { timestamps: true });

// Joi Validation Function
const validateCategory = (data) => {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required()
    });

    return schema.validate(data);
};

// Export Model & Validation Function
const CategoryModel = mongoose.model('Category', categorySchema);
module.exports = { CategoryModel, validateCategory };
