import razorpay from 'razorpay';
import dotenv from 'dotenv'

dotenv.config();

const createRazorpayInstance = () =>{
    return new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_SECRET
    })
}

export default createRazorpayInstance();