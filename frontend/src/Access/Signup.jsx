import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Scene3D from "../components/Scene3D";
import axios from "axios";
const VITE_APP_API = import.meta.env.VITE_APP_API;
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Nav2 from "../components/Nav2";
import PaymentButton from "../components/PaymentButton"; // Import the PaymentButton

export default function Signup() {
  const [userType, setUserType] = useState("client");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    experience: "",
    hourlyRate: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userType === "freelancer" ? "/api/auth/register/freelancer" : "/api/auth/register/client";
      const res = await axios.post(`${VITE_APP_API}${endpoint}`, formData);
      toast.success(res.data.message);
      setSignupSuccess(true); // Set signup success to true
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative container mx-auto px-4 py-8 h-screen flex items-center justify-center bg-[#dbf5ff]">
      <div className="flex w-full h-full">
        <Nav2 />

        {/* Left Side: 3D Scene */}
        <div className="w-1/2 hidden lg:block">
          <Scene3D />
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center mt-18">
          <div className="max-w-xl w-full bg-white neo-brutalist p-10 rounded-lg shadow-lg min-h-[20px]">
            <h1 className="text-4xl font-bold mb-5 mt-7 text-center">Create Account</h1>

            <div className="mb-6 space-x-4 text-center">
              <select
                onChange={(e) => setUserType(e.target.value)}
                className="neo-select bg-yellow-400 text-black font-bold py-2 px-4"
              >
                <option value="client">Client</option>
                <option value="freelancer">FreeLancer</option>
              </select>
            </div>

            {!signupSuccess ? (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block font-bold mb-2">Name</label>
                  <input
                    type="text"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 neo-brutalist"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Email</label>
                  <input
                    type="email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 neo-brutalist"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Password</label>
                  <input
                    type="password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-2 neo-brutalist"
                    required
                  />
                </div>

                {userType === "freelancer" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold mb-2">Skills (comma-separated)</label>
                      <input
                        type="text"
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        className="w-full p-2 neo-brutalist"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2">Experience (in years)</label>
                      <input
                        type="number"
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full p-2 neo-brutalist"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col space-y-2">
                  <button type="submit" className="w-full neo-button bg-purple-500 text-white font-bold py-2 px-4">
                    Create Account
                  </button>

                  <Link
                    to="/login"
                    className="w-full text-center bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-2"
                  >
                    Already have an account? Log in
                  </Link>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Signup Successful!</h2>
                <p className="mb-4">Please complete the payment to proceed.</p>
                <PaymentButton 
                  job={{ _id: "67bcce4da5f36b1a92878f03" }} 
                  client={{ _id: "67bccdf6a5f36b1a92878ef0" }} 
                  freelancer={{ _id: "67bcce2aa5f36b1a92878efb" }} 
                  amount={100} 
                />


              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}