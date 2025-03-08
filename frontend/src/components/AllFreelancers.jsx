const VITE_APP_API = import.meta.env.VITE_APP_API;

import React, { useState, useEffect } from "react";
import axios from "axios";

const FreelancersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [freelancers, setFreelancers] = useState([]);
  const [sortCategory, setSortCategory] = useState(""); // Sorting category
  const [selectedSkill, setSelectedSkill] = useState("All"); // Skill filter

  // Fetch freelancers from the backend
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.get(`${VITE_APP_API}/api/freelancers`);
        setFreelancers(response.data);
      } catch (error) {
        console.error("Error fetching freelancers:", error);
      }
    };
    fetchFreelancers();
  }, []);

  // Generate random category stats
  const [categoryStats, setCategoryStats] = useState([]);
  useEffect(() => {
    const categories = [
      { name: "React Developer", baseNumber: 1234, bgColor: "#FFE8E8" },
      { name: "Java Full Stack", baseNumber: 856, bgColor: "#71A894" },
      { name: "Content Writing", baseNumber: 654, bgColor: "#FFF4CC" },
      { name: "UI/UX", baseNumber: 432, bgColor: "#FFE8E8" },
    ];

    const randomized = categories.map((category) => ({
      ...category,
      count: Math.floor(category.baseNumber * (0.8 + Math.random() * 0.4)), // Randomize ±20%
    }));

    setCategoryStats(randomized);
  }, []);

  // Get unique skills for filtering
  const allSkills = Array.from(new Set(freelancers.flatMap((f) => f.skills)));

  // Sort freelancers based on category
  const sortedFreelancers = [...freelancers].sort((a, b) => {
    if (sortCategory === "availability") {
      return b.isAvailable - a.isAvailable;
    } else if (sortCategory === "experience") {
      return parseInt(b.experience) - parseInt(a.experience);
    } else if (sortCategory === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Filter freelancers based on search & selected skill
  const filteredFreelancers = sortedFreelancers.filter(
    (f) =>
      f.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      (selectedSkill === "All" || f.skills.includes(selectedSkill))
  );

  return (
    <div className="bg-[#E0F4FF] min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Find Freelancers</h1>

        {/* Horizontal Scrolling Categories */}
        <div className="mb-8 overflow-x-auto pb-4">
          <div className="flex gap-4" style={{ minWidth: `${categoryStats.length * 320}px` }}>
            {categoryStats.map((category) => (
              <div
                key={category.name}
                className="neo-brutalist p-6 min-w-[300px] flex-shrink-0"
                style={{ backgroundColor: category.bgColor }} // Added dynamic background color
              >
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-4xl font-bold mb-2 text-[#2D2D2D]">
                  {category.count.toLocaleString()}
                </p>
                <p className="text-sm text-[#555555] uppercase tracking-wide">
                  Active Professionals
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white neo-brutalist p-6 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by skill..."
            className="w-full p-2 neo-brutalist mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Skill Filter Dropdown */}
          <select
            className="w-full p-2 neo-brutalist mb-4"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="All">All Skills</option>
            {allSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          {/* Sorting Buttons */}
          <div className="flex gap-4">
            <button
              className={`neo-button ${sortCategory === "name" ? "bg-[#4ECDC4]" : "bg-white"}`}
              onClick={() => setSortCategory("name")}
            >
              Sort by Name
            </button>
            <button
              className={`neo-button ${sortCategory === "availability" ? "bg-[#4ECDC4]" : "bg-white"}`}
              onClick={() => setSortCategory("availability")}
            >
              Sort by Availability
            </button>
            <button
              className={`neo-button ${sortCategory === "experience" ? "bg-[#4ECDC4]" : "bg-white"}`}
              onClick={() => setSortCategory("experience")}
            >
              Sort by Experience
            </button>
          </div>
        </div>

        {/* Freelancer List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.length > 0 ? (
            filteredFreelancers.map((freelancer) => (
              <div
                key={freelancer._id}
                className="bg-white neo-brutalist p-6 animate-fadeIn"
              >
                {/* Image Container */}
                <div className="w-full h-48 mb-4 flex items-center justify-center">
                  {freelancer.image ? (
                    <img
                      src={freelancer.image}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#4ECDC4]"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>

                {/* Freelancer Details */}
                <h3 className="text-xl font-bold mb-2">{freelancer.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Email: {freelancer.email}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Experience: {freelancer.experience} years
                </p>
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#FFE66D] px-2 py-1 rounded-md text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <p
                  className={`text-sm font-bold ${
                    freelancer.isAvailable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {freelancer.isAvailable ? "Available" : "Not Available"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No freelancers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancersList;