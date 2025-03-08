import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { FaComment, FaHeart } from "react-icons/fa"; // Import icons from react-icons

const categories = [
  // Existing cards
  {
    id: 1,
    title: "Development & IT",
    description: "Hire expert developers and IT pros",
    stats: { experts: "324", projects: "3.2k" },
    bgColor: "#FFE8E8"
  },
  {
    id: 2,
    title: "Design & Creative",
    description: "Hire top designers and creative experts",
    stats: { experts: "567", projects: "8.9k" },
    bgColor: "#71A894"
  },
  {
    id: 3,
    title: "AI Services",
    description: "Find AI specialists for innovative solutions",
    stats: { experts: "200", projects: "23.8k" },
    bgColor: "#FFF4CC"
  },
  
  // New cards
  {
    id: 4,
    title: "Writing & Translation",
    description: "Access professional translators and writers",
    stats: { experts: "456", projects: "5.6k" },
    bgColor: "#FFE8E8"  // Repeating color pattern
  },
  {
    id: 5,
    title: "Finance & Accounting",
    description: "Engage certified financial experts",
    stats: { experts: "389", projects: "7.1k" },
    bgColor: "#71A894"
  },
  {
    id: 6,
    title: "Sales & Marketing",
    description: "Boost sales with marketing specialists",
    stats: { experts: "672", projects: "12.4k" },
    bgColor: "#FFF4CC"
  }
];

const Service = () => {
  return (
    <div className="mt-32 text-center">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="font-abril-fatface text-7xl leading-tight"
      >
        Browse and Hire Talent by Category
      </motion.div>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
      >
        Discover and connect with skilled professionals across various categories,
        from design and development to marketing and writing.
      </motion.p>

      {/* Marquee Component */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8"
      >
        <Marquee speed={40} pauseOnHover gradient={false} className="py-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="mx-4 w-[427px] h-[215px] rounded-xl border-2 border-black shadow-[4px_4px_0_0_#000] 
                       transition-all hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1"
              style={{ backgroundColor: category.bgColor }}
            >
              <div className="p-6 text-left">
                {/* Title */}
                <h3 className="font-Akatab-ExtraBold font-bold text-2xl text-black mb-2">
                  {category.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 mb-6">{category.description}</p>
                
                {/* Stats */}
                <div className="flex gap-8">
                  <div>
                    <div className="font-Akatab-ExtraBold text-3xl text-black">
                      {category.stats.experts}
                    </div>
                    <span className="text-sm">Active Experts</span>
                  </div>
                  <div>
                    <div className="font-Akatab-ExtraBold text-3xl text-black">
                      {category.stats.projects}
                    </div>
                    <span className="text-sm">Projects Done</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
};

export default Service;