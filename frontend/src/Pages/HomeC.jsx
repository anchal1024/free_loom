import NavC from "../components/NavC";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Demo from "../assets/Demo.mp4";
import Service from "../components/Service";
import CollaborationSection from "../components/CollaborationSection";
import Testimonials from "../components/Testimonals";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavC />

      {/* Main Content */}
      <div className="pt-[210px] px-20">
        {/* First Section: When Talent Meets Opportunity */}
        <div className="flex flex-row items-start gap-16">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-1"
          >
            <div className="font-abril-fatface font-bold text-6xl leading-tight">
              When Talent Meets <br /> Opportunity
            </div>
            {/* New Text */}
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              Run an organization where members get rewarded for their contributions with fractional ownership.
            </p>
            <br />
            
            <button
              className="bg-[#71A894] hover:bg-[#71a8948c] text-white font-bold py-2 px-4 rounded-full"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>

          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex-1"
          >
            <video
              className="w-full max-w-xl rounded-xl shadow-2xl"
              autoPlay
              muted
              loop
              style={{ objectFit: "cover" }}
            >
              <source src={Demo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Services Section */}
        <Service /> {/* Use the Services component here */}

        {/* Collaboration Section */}
        <CollaborationSection />

        {/* Testimonials Section */}
        <Testimonials />

        
        <Footer/>

      </div>
    </div>
  );
};

export default Home;