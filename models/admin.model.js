const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');


// Admin Schema
const adminSchema = new mongoose.Schema({
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
    role: { 
        type: String, 
        enum: ["superadmin", "admin", "moderator"], 
        default: "admin" // Default role for new admins
    }
}, { timestamps: true });


// Hash Password Before Saving
adminSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next(); // Only hash if password is modified
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



// Joi Validation Function
const validateAdmin = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).trim().required(),
        email: Joi.string().email().lowercase().required()
            .regex(/^\S+@\S+\.\S+$/).message("Invalid email format"),
        password: Joi.string().min(6).required()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
            .message("Password must be at least 6 characters, contain a letter and a number"),
        role: Joi.string().valid("superadmin", "admin", "moderator").optional()
    });

    return schema.validate(data);
};

// Export Model & Validation Function
const AdminModel = mongoose.model('Admin', adminSchema);
module.exports = { AdminModel, validateAdmin };
