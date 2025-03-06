const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

// Address Schema
const addressSchema = new mongoose.Schema({
    state: { type: String, required: true, trim: true },
    zip: { type: Number, required: true, min: 10000, max: 99999 }, // US Zip code format
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true }
});

// User Schema
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Name is required"], 
        minlength: [3, "Name should have at least 3 characters"], 
        maxlength: [50, "Name cannot exceed 50 characters"], 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        lowercase: true, 
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"] 
    },
    password: { 
        type: String, 
        required: [true, "Password is required"], 
        minlength: [6, "Password must be at least 6 characters long"], 
        select: false  // Prevents password from being returned in queries
    },
    phone: { 
        type: String, 
        required: true, 
        match: [/^\d{10}$/, "Phone number must be 10 digits"], 
        unique: true 
    },
    addresses: [addressSchema]
}, { timestamps: true });




// Hash Password Before Saving
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next(); // Only hash if password is modified
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



// Joi Validation Function
const validateUser = (data) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(50).trim().required(),
        email: Joi.string().email().lowercase().required()
            .regex(/^\S+@\S+\.\S+$/).message("Invalid email format"),
        password: Joi.string().min(6).required()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
            .message("Password must be at least 6 characters, contain a letter and a number"),
        phone: Joi.string().length(10).pattern(/^\d+$/).required()
            .message("Phone number must be exactly 10 digits"),
        addresses: Joi.array().items(
            Joi.object({
                state: Joi.string().trim().required(),
                zip: Joi.number().min(10000).max(99999).required(),
                city: Joi.string().trim().required(),
                address: Joi.string().trim().required()
            })
        ).optional()
    });

    return schema.validate(data);
};

// Export Model & Validation Function
const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel, validateUser };
