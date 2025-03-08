// components/Testimonials.jsx
import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import image from "../assets/Image.png"; // Ensure this path is correct

const Testimonials = () => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const countRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      countRef.current = setInterval(() => {
        setCount((prev) => {
          const nextCount = prev + 10; // Adjust speed here
          return nextCount >= 10000 ? 10000 : nextCount;
        });
      }, 1);
    }
    
    return () => clearInterval(countRef.current);
  }, [isInView]);

  return (
    <motion.div 
      ref={ref}
      className="w-[1389px] h-[498px] bg-[#f6dc9b] rounded-[14px] mx-auto my-20 p-12 flex gap-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Left Card */}
      <motion.div
        className="w-[600px] bg-white rounded-xl p-8 shadow-[8px_8px_0_0_#71A894] border-2 border-black hover:shadow-[12px_12px_0_0_#71A894] transition-all"
        initial={{ x: -50 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Client Info */}
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={image} 
            alt="Jassir Jonis" 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-Akatab-ExtraBold font-bold text-2xl">Jassir Jonis</h3>
            <p className="text-[#71A894] font-medium">our beloved client</p>
          </div>
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-600 mb-8">
          "Hey guys, love what you're doing and I'm convinced that together 
          we'll achieve amazing things."
        </p>

        {/* Hired Freelancers */}
        <div className="border-t-2 border-black pt-6">
          <span className="text-sm text-black-500 font-medium">HIRED FREELANCERS</span>
          <div className="font-abril-fatface text-4xl text-[#71A894]">10,000</div>
        </div>
      </motion.div>

      {/* Right Content */}
      <motion.div 
        className="flex-1 flex flex-col justify-center"
        initial={{ x: 50 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-abril-fatface font-bold text-4xl text-[#71A894] mb-6">
          Trustworthy Reviews from
          <br />
          our clients
        </h2>
        
        <p className="text-xl text-gray-600 mb-8 max-w-[500px]">
          Hear from our satisfied clients through authentic, trustworthy reviews that
          highlight their experiences, success stories, and the value we bring to their
          businesses
        </p>

        {/* Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black w-fit">
          <motion.div 
            className="font-abril-fatface text-6xl text-[#71A894]"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {count.toLocaleString()}
          </motion.div>
          <p className="text-gray-600">Positive Reviews</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Testimonials;