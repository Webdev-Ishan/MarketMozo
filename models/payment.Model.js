const mongoose = require('mongoose');
const Joi = require('joi');

// Payment Schema
const paymentSchema = new mongoose.Schema({
    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "order", 
        required: [true, "Order reference is required"] 
    },
    amount: { 
        type: Number, 
        required: [true, "Amount is required"], 
        min: [1, "Amount must be greater than zero"] 
    },
    method: { 
        type: String, 
        required: [true, "Payment method is required"] 
    },
    status: { 
        type: String,  
        default: "pending", 
        required: true 
    },
    transactionID: { 
        type: String, 
        required: [true, "Transaction ID is required"], 
        unique: true, 
        trim: true 
    }
}, { timestamps: true });

// Joi Validation Function
const validatePayment = (data) => {
    const schema = Joi.object({
        order: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).message("Invalid Order ID"),
        amount: Joi.number().min(1).required(),
        method: Joi.string().required(),
        status: Joi.string().required(),
        transactionID: Joi.string().trim().required().max(50)
    });

    return schema.validate(data);
};

// Export Model & Validation Function
const PaymentModel = mongoose.model('Payment', paymentSchema);
module.exports = { PaymentModel, validatePayment };
