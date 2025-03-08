import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Scene3D from "../components/Scene3D";
import axios from "axios";
import toast from "react-hot-toast";
const VITE_APP_API = import.meta.env.VITE_APP_API;
import { useAuth } from "../context/AuthContext";
import Nav2 from "../components/Nav2";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {auth,setAuth} = useAuth();

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const socialLogin = (provider) => {
    showLoading();
    setTimeout(() => {
      hideLoading();
      alert(`${provider} login simulation complete!`);
    }, 1500);
  };

  const showForgotPassword = () => {
    const email = prompt("Enter your email address:");
    if (email) {
      showLoading();
      setTimeout(() => {
        hideLoading();
        alert("Password reset link sent to your email!");
      }, 1500);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${VITE_APP_API}/api/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);
      const { client, freelancer,token } = res.data;
      toast.success(res.data.message);
      setAuth({
        ...auth,
        freelancer: freelancer || null,
        client: client || null, 
        token: token
      })
      
      localStorage.setItem('auth',JSON.stringify({freelancer,client,token}))
      if (freelancer) {
        navigate("/dashboard");
      } else if (client) {
        navigate("/client-dashboard");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative container mx-auto px-4 py-8 h-screen flex items-center justify-center bg-[#dbf5ff]">
      
      <Nav2/>
      <br /><br />
      <LoadingSpinner loading={loading} />

      <div className="flex w-full h-full">
        {/* Left Side: 3D Scene */}
        <div className="w-1/2 hidden lg:block">
          <Scene3D />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#dbf5ff] mt-18">
          <div className="max-w-xl w-full bg-white neo-brutalist p-10 rounded-lg shadow-lg min-h-[500px]">
            <h1 className="text-4xl font-bold mb-6 text-center">FlexiWork</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 neo-brutalist"
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 neo-brutalist"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full neo-button bg-purple-500 text-white font-bold py-2 px-4"
              >
                Login
              </button>

              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={showForgotPassword}
                  className="text-blue-600 underline"
                >
                  Forgot Password?
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => socialLogin("google")}
                className="w-full neo-button bg-white text-black font-bold py-2 px-4 flex items-center justify-center gap-2"
              >
                <i className="bi bi-google"></i> Continue with Google
              </button>
              <button
                onClick={() => socialLogin("facebook")}
                className="w-full neo-button bg-blue-600 text-white font-bold py-2 px-4 flex items-center justify-center gap-2"
              >
                <i className="bi bi-facebook"></i> Continue with Facebook
              </button>

              <Link
                to="/signup"
                className="block text-center w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-2"
              >
                Don't have an Account? Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
