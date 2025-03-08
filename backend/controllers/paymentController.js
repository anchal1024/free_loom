import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";
import Job from "../models/Job.js";
import Freelancer from "../models/Freelancer.js";

dotenv.config();


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async(req,res)=>{
    try {
        const { job, client, freelancer, amount, currency  } = req.body;

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt: `receipt_${crypto.randomBytes(5).toString("hex")}`,
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, job, client, freelancer, amount } = req.body;

        // Verify Razorpay signature
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // Save payment details
        const payment = new Payment({
            job,
            client,
            freelancer,
            amount,
            razorpay_order_id,
            razorpay_payment_id,
            status: "completed",
        });
        await payment.save();

        // **Update Job Status to "hired"**
        const updatedJob = await Job.findByIdAndUpdate(
            job, 
            { status: "hired", freelancer: freelancer }, 
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        // **Update Freelancer Availability to False**
        const updatedFreelancer = await Freelancer.findByIdAndUpdate(
            freelancer,
            { isAvailable: false },
            { new: true }
        );

        if (!updatedFreelancer) {
            return res.status(404).json({ success: false, message: "Freelancer not found" });
        }
        console.log("Updated Job:", updatedJob);
        console.log("Updated Freelancer:", updatedFreelancer);

        res.json({ success: true, message: "Payment verified, job assigned, and freelancer availability updated" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
