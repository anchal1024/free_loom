import axios from "axios";
const VITE_APP_API = import.meta.env.VITE_APP_API;

const PaymentButton = ({ job, client, freelancer, amount }) => {
    const handlePayment = async () => {
        try {
            const { data } = await axios.post(`${VITE_APP_API}/api/payment/create-order`, {
                job,
                client,
                freelancer,
                amount,
                currency: "INR",
            });

            const { id, amount: orderAmount, currency } = data.order;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
                amount: orderAmount,
                currency,
                name: "FLEXIWORK",
                description: "Payment",
                order_id: id,
                handler: async (response) => {
                    try {
                        await axios.post(`${VITE_APP_API}/api/payment/verify-payment`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            job,
                            client,
                            freelancer,
                            amount,
                        });

                        alert("Payment Successful1");

                        window.location.reload(); 
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        alert("Payment verification failed. Please try again.");
                    }
                },
                prefill: {
                    name: client.name, 
                    email: client.email,
                    contact: "9999999999", 
                },
                theme: {
                    color: "#4ECDC4", 
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            alert("Failed to initiate payment. Please try again.");
        }
    };

    return (
        <button onClick={handlePayment} className="px-4 py-2 bg-blue-500 text-white rounded">
            Pay ₹{amount} to Hire
        </button>
    );
};

export default PaymentButton;