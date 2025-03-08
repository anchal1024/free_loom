import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";


const Nav = () => {

  

  const {auth,setAuth} = useAuth();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    setAuth({
      ...auth,
      client: null,
      freelancer: null,
      token: null
    })
    localStorage.removeItem('auth')
    navigate('/login')
    toast.success("Logout Successfull")
  }
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[1402px] h-[70px] bg-[#F8F2E4] rounded-[6px] flex items-center justify-between px-8 shadow-md">
      <div className="flex items-center gap-3">
        
        <button className="font-Abhaya_Libre_ExtraBold text-[32px] tracking-[-1.28px] text-black"  onClick={() => navigate("/")}>
          FlexiWork
        </button>
      </div>

      <div className="flex gap-16 absolute left-1/2 -translate-x-1/2">
        <button className="font-Akatab-ExtraBold font-extrabold text-xl text-black cursor-pointer" onClick={() => navigate('/')}>
          HOME
        </button>
        <button className="font-Akatab-ExtraBold font-extrabold text-xl text-black cursor-pointer">
          ABOUT
        </button>
        <button className="font-Akatab-ExtraBold font-extrabold text-xl text-black cursor-pointer">
          CONTACT US
        </button>
      </div>

      {
        (!auth.freelancer && !auth.client) ? (
          <div className="flex items-center gap-8">
        <button className="font-Akatab-ExtraBold font-extrabold text-xl text-[#71A894]" onClick={() => navigate('/login')}>
          LOGIN
        </button>
        <button className="w-[140px] h-[50px] bg-[#71A894] rounded-lg flex items-center justify-center font-Akatab-ExtraBold font-extrabold text-xl text-white hover:bg-hover-green transition-colors"
          onClick={() => navigate('/signup')}>
          SIGNUP
        </button>
      </div>
        ) : (<>
          <div className="flex items-center gap-8">
          <button className="font-Akatab-ExtraBold font-extrabold text-xl text-[#d8611b]" onClick={handleLogout}>
          LOGOUT
        </button>
          </div>
        </>)
      }
      
    </div>
  );
};

export default Nav;