import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import axios from "axios";
import NavF from "../components/NavF";
import Jobs from "../Pages/Jobs";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const VITE_APP_API = import.meta.env.VITE_APP_API;

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const FreelancerDashboard = () => {
  const [completedJobs, setCompletedJobs] = useState([]);
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const { auth } = useAuth();
  const freelancerId = auth?.freelancer?._id; // Correctly extract freelancerId
  const token = auth.token;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!freelancerId) {
          console.error("Freelancer ID not found. Please log in again.");
          return;
        }

        // Fetch all jobs
        const { data: jobs } = await axios.get(`${VITE_APP_API}/api/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Jobs Data:", jobs); // Debugging: Inspect the jobs data

        // Filter jobs where the freelancer is hired (ongoing jobs)
        const hiredJobs = jobs.filter(
          (job) => job.freelancer?._id.toString() === freelancerId && job.status === "hired"
        );

        console.log("Hired Jobs:", hiredJobs); // Debugging: Inspect the filtered hired jobs

        // Filter jobs where the freelancer has applied
        const appliedJobs = jobs.filter((job) => job.applicants?.includes(freelancerId));

        // Filter jobs where the freelancer has completed
        const completedJobs = jobs.filter(
          (job) => job.freelancer?._id.toString() === freelancerId && job.status === "completed"
        );

        // Set states
        setOngoingJobs(hiredJobs);
        setAppliedJobs(appliedJobs.map((job) => job._id));
        setCompletedJobs(completedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs.");
      }
    };

    if (freelancerId) {
      fetchJobs();
    }
  }, [freelancerId, token]); // Ensure freelancerId and token are in the dependency array

  const handleCompleteJob = async (jobId) => {
    try {
      // Update the job status to "completed"
      await axios.patch(
        `${VITE_APP_API}/api/jobs/${jobId}`,
        { status: "completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Update the ongoingJobs state
      setOngoingJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
  
      // Add the job to completedJobs
      const completedJob = ongoingJobs.find((job) => job._id === jobId);
      if (completedJob) {
        setCompletedJobs((prevJobs) => [...prevJobs, completedJob]);
      }
  
      // Mark the freelancer as available
      await axios.patch(
        `${VITE_APP_API}/api/freelancers/${freelancerId}`,
        { isAvailable: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      toast.success("Job marked as completed!");
    } catch (error) {
      console.error("Error completing job:", error);
      toast.error("Failed to complete job.");
    }
  };

  return (
    <div className="bg-[#E0F4FF] min-h-screen p-8">
      <NavF />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Freelancer Dashboard</h1>

        {/* Ongoing Jobs Section */}
        <div className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Ongoing Jobs</h2>
          {ongoingJobs.length === 0 ? (
            <p className="text-gray-600">No ongoing jobs.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {ongoingJobs.map((job) => (
                <li key={job._id} className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-gray-600">Budget: ${job.budget}</p>
                      <p className="text-gray-600">Client: {job.client?.name}</p>
                    </div>
                    <button
                      onClick={() => handleCompleteJob(job._id)}
                      className="neo-button bg-green-500 text-white"
                    >
                      Mark as Completed
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Completed Jobs Section */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Completed Jobs</h2>
          {completedJobs.length === 0 ? (
            <p className="text-gray-600">No completed jobs yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {completedJobs.map((job) => (
                <li key={job._id} className="p-4 border-b">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <p className="text-gray-600">Budget: ${job.budget}</p>
                    <p className="text-gray-600">Client: {job.client?.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Jobs Section */}
        <div className="mt-8">
          <Jobs appliedJobs={appliedJobs} />
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;