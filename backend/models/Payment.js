import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: { 
        type: String, 
        required: true, 
        default: "INR" 
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    razorpay_order_id: { 
        type: String,
        required: true
    },
    razorpay_payment_id: { 
        type: String, 
        required: true 
    },
});

export default mongoose.model('Payment', paymentSchema);