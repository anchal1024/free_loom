import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa';

const Talents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTalent, setSelectedTalent] = useState(null);

  const icons = {
    code: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="h-6 w-6"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>,
    palette: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6"><path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>,
    bullhorn: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6"><path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75H192 160 64c-35.3 0-64 28.7-64 64v96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V352l8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32zM416 434.5L373.3 391.8c-56.9-57-133.8-89-215.3-89H152 128 64V160h64 24 8.7c81.5 0 158.4-32 215.3-89L416 28.5v406z"/></svg>,
    pen: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>,
    video: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6 w-6"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/></svg>,
    music: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>,
    star: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-4 w-4 text-yellow-400"><path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>,
    search: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
  };

  const categories = [
    { id: "development", name: "Development & IT", count: 1234, icon: icons.code, bgColor: "#FFE8E8" },
    { id: "design", name: "Design & Creative", count: 856, icon: icons.palette, bgColor: "#71A894" },
    { id: "marketing", name: "Sales & Marketing", count: 654, icon: icons.bullhorn, bgColor: "#FFF4CC" },
    { id: "writing", name: "Writing & Translation", count: 432, icon: icons.pen, bgColor: "#FFE8E8" },
    { id: "video", name: "Video & Animation", count: 321, icon: icons.video, bgColor: "#71A894" },
    { id: "music", name: "Music & Audio", count: 234, icon: icons.music, bgColor: "#FFF4CC" },
  ];

  const talents = [
    {
      id: 1,
      name: "Alexander Mitchell",
      role: "Senior Full Stack Developer",
      rating: 4.9,
      hourlyRate: 85,
      completedProjects: 127,
      image: "https://public.readdy.ai/ai/img_res/b4ac53dc0c1b821905e114f93a6e1ed5.jpg",
      category: "development"
    },
    {
      id: 2,
      name: "Sophia Rodriguez",
      role: "UI/UX Designer",
      rating: 4.8,
      hourlyRate: 75,
      completedProjects: 93,
      image: "https://public.readdy.ai/ai/img_res/35a8d88b894a5bd559809290370fc7f2.jpg",
      category: "design"
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Digital Marketing Specialist",
      rating: 4.7,
      hourlyRate: 65,
      completedProjects: 84,
      image: "https://public.readdy.ai/ai/img_res/023e89f3b44746bd8f44186c6fe85cc8.jpg",
      category: "marketing"
    },
    {
      id: 4,
      name: "Emily Johnson",
      role: "Content Writer",
      rating: 4.8,
      hourlyRate: 60,
      completedProjects: 112,
      image: "https://public.readdy.ai/ai/img_res/df78fb7d4b1f95db4b2c1f1a79eb6edc.jpg",
      category: "writing"
    },
    {
      id: 5,
      name: "David Lee",
      role: "Motion Graphics Artist",
      rating: 4.9,
      hourlyRate: 90,
      completedProjects: 76,
      image: "https://public.readdy.ai/ai/img_res/c05f3ad78df1f65be9b3a62f752a8642.jpg",
      category: "video"
    },
    {
      id: 6,
      name: "Sarah Miller",
      role: "Sound Engineer",
      rating: 4.6,
      hourlyRate: 70,
      completedProjects: 58,
      image: "https://public.readdy.ai/ai/img_res/b0c9dc29c61bdf7f3dbea0fbd961c7c1.jpg",
      category: "music"
    },
  ];



  const filteredTalents = selectedCategory === "all" 
    ? talents 
    : talents.filter(talent => talent.category === selectedCategory);

  // Helper function to generate relevant skills based on category
  const generateSkills = (category) => {
    const skillsets = {
      "development": ["JavaScript", "React", "Node.js", "Python", "AWS", "TypeScript", "MongoDB"],
      "design": ["UI Design", "UX Research", "Figma", "Adobe XD", "Prototyping", "Visual Design"],
      "marketing": ["SEO", "Content Strategy", "Social Media", "Analytics", "Email Marketing"],
      "writing": ["Content Writing", "Copywriting", "Technical Writing", "Editing", "Research"],
      "video": ["After Effects", "Premier Pro", "3D Animation", "Storyboarding", "Color Grading"],
      "music": ["Sound Design", "Mixing", "Mastering", "Music Production", "Audio Engineering"]
    };
    return skillsets[category] || [];
  };

  // Component for displaying talent profile in a modal
  const TalentProfileModal = ({ talent, onClose }) => {
    if (!talent) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0_0_#000] w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="font-abril-fatface text-3xl">Professional Profile</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {/* Assuming you have an 'X' icon in your icons object */}
                {icons.X || <span>X</span>}
              </button>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="w-full h-72 object-cover rounded-xl border-2 border-black"
                />
              </div>
  
              <div>
                <h3 className="font-Akatab-ExtraBold text-2xl font-bold text-black mb-2">
                  {talent.name}
                </h3>
                <p className="text-xl text-gray-700 mb-4">{talent.role}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  {icons.star || <span>★</span>}
                  <span className="font-medium">{talent.rating}</span>
                  <span className="text-gray-600">
                    ({talent.completedProjects} projects)
                  </span>
                </div>
  
                <div className="text-2xl font-bold mb-6">
                  ${talent.hourlyRate}/hr
                </div>
  
                <button className="w-full px-6 py-3 bg-black text-white text-lg font-medium hover:bg-gray-800 transition-colors rounded-md mb-4">
                  Hire {talent.name.split(' ')[0]}
                </button>
                
                <button className="w-full px-6 py-3 border-2 border-black text-black text-lg font-medium hover:bg-gray-100 transition-colors rounded-md">
                  Message
                </button>
              </div>
            </div>
  
            <div className="mt-8 border-t-2 border-gray-200 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold mb-1">
                    {talent.completedProjects}
                  </div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold mb-1">
                    {Math.floor(talent.completedProjects * 0.92)}
                  </div>
                  <div className="text-gray-600">On-time Delivery</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold mb-1">
                    {Math.floor(talent.completedProjects * 0.95)}
                  </div>
                  <div className="text-gray-600">Satisfied Clients</div>
                </div>
              </div>
  
              <h4 className="font-bold text-xl mb-4">About</h4>
              <p className="text-gray-700 mb-6">
  {`${talent.name} is a highly skilled ${talent.role.toLowerCase()} with extensive experience in delivering successful projects. With a track record of ${talent.completedProjects} completed projects and a stellar rating of ${talent.rating}, they consistently exceed client expectations.`}
</p>

  
              <h4 className="font-bold text-xl mb-4">Skills</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {generateSkills(talent.category).map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
  
              <h4 className="font-bold text-xl mb-4">Availability</h4>
              <div className="flex items-center gap-2 text-green-600 mb-6">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                Available - Ready to start new projects
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ... (previous JSX for hero, search, categories, etc.) */}
      {/* Hero Section with Heading */}
      <div className="text-center mb-16">
        <h1 className="font-abril-fatface text-7xl leading-tight mb-6">
          Find Expert Talent
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Connect with skilled professionals ready to bring your projects to life
        </p>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for skilled professionals..."
            className="w-full px-6 py-4 rounded-lg text-gray-900 bg-white border-2 border-black shadow-[4px_4px_0_0_#000] focus:outline-none focus:shadow-[6px_6px_0_0_#000] transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-black text-white text-lg font-medium hover:bg-gray-800 transition-colors rounded-md flex items-center gap-2">
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
        <div className="flex overflow-x-auto py-6 scrollbar-hide">
          <div className="flex gap-6 px-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="min-w-[320px] h-[180px] rounded-xl border-2 border-black shadow-[4px_4px_0_0_#000] 
                         transition-all hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1 cursor-pointer"
                style={{ backgroundColor: category.bgColor }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="p-6 text-left h-full flex flex-col justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{category.icon}</div>
                    <h3 className="font-Akatab-ExtraBold font-bold text-xl text-black">
                      {category.name}
                    </h3>
                  </div>
                  <div className="mt-auto">
                    <div className="font-Akatab-ExtraBold text-2xl text-black">
                      {category.count}
                    </div>
                    <span className="text-sm">Active Professionals</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedCategory !== "all" && (
          <div className="text-center mt-4">
            <button 
              onClick={() => setSelectedCategory("all")}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              View All Categories
            </button>
          </div>
        )}
      </div>

      {/* Featured Talents */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Professionals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTalents.map((talent) => (
            <div
              key={talent.id}
              className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0_0_#000] 
                      transition-all hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1 overflow-hidden"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={talent.image}
                  alt={talent.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-Akatab-ExtraBold text-xl font-bold text-black mb-2">
                  {talent.name}
                </h3>
                <p className="text-gray-700 mb-4">
                  {talent.role}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {icons.star}
                    <span className="font-medium ml-1">
                      {talent.rating}
                    </span>
                  </div>
                  <span className="text-gray-700 font-semibold">
                    ${talent.hourlyRate}/hr
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {talent.completedProjects} projects completed
                  </span>
                  <button 
                    className="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors rounded-md"
                    onClick={() => {
                        setSelectedTalent(talent);
                        console.log("Selected Talent:", talent);
                      }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

  

      {selectedTalent && (
        <TalentProfileModal
          talent={selectedTalent}
          onClose={() => setSelectedTalent(null)}
        />
      )}
      <br /> <br />
    </div>

  );
};

export default Talents;