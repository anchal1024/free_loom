// components/CollaborationSection.jsx
import { motion } from "framer-motion";
import anna from "../assets/anna.png"
import dillon from "../assets/dillon.png"
import kasa from "../assets/kasa.png"

const freelancers = [
  {
    name: "Dillon Kydd",
    projects: "142 Projects",
    photo: dillon
  },
  {
    name: "Anna Olsen",
    projects: "98 Projects",
    photo: anna
  },
  {
    name: "Kas Moss",
    projects: "203 Projects",
    photo: kasa
  }
];

const CollaborationSection = () => {
  return (
    <div className="w-full py-20 px-20 flex flex-col md:flex-row gap-16 items-center">
      {/* Left Text Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
       
        <h2 className="font-abril-fatface text-5xl leading-tight mb-6">
          This is how good <span className="text-[#71A894] font-bold">companies</span>
          <br />
          find good <span className="text-[#71A894] font-bold">company</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          A premier platform where top companies seamlessly connect with skilled professionals 
          and trusted partners, fostering meaningful collaborations, driving innovation, 
          and ensuring long-term business success.
        </p>
      
      </motion.div>

         {/* Updated Right Card Section */}
         <motion.div 
        className="flex-1"
        initial={{ rotateY: 180, opacity: 0 }}
        whileInView={{ rotateY: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2
        }}
      >
        <motion.div 
          className="w-[484px] h-[400px] bg-white border-2 border-black rounded-xl 
                   shadow-[8px_8px_0_0_#71A894] hover:shadow-[12px_12px_0_0_#71A894]
                   transition-all cursor-pointer p-8"
          whileHover={{ 
            scale: 1.02,
            rotateZ: -1
          }}
        >
          <div className="flex flex-col h-full">
            {/* Freelancers Title */}
            <div className="font-Akatab-ExtraBold text-2xl text-[#71A894] mb-6">
              Freelancers
            </div>

            {/* Members List */}
            <div className="space-y-6">
              {freelancers.map((freelancer) => (
                <div key={freelancer.name} className="flex items-center gap-4">
                  <img 
                    src={freelancer.photo}
                    alt={freelancer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-Akatab-ExtraBold text-lg">
                      {freelancer.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {freelancer.projects}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shares Counter */}
            <div className="mt-auto pt-6 border-t-2 border-black">
              <div className="font-Akatab-ExtraBold text-[#71A894]">
                100 SHARES
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CollaborationSection;