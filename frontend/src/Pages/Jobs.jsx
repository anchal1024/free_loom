import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const VITE_APP_API = import.meta.env.VITE_APP_API;

const Jobs = () => {
    const { auth } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [requestedJobs, setRequestedJobs] = useState(new Set());
  
    // Fetch all jobs
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await axios.get(`${VITE_APP_API}/api/jobs`);
          setJobs(response.data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          toast.error("Failed to fetch jobs.");
        }
      };
  
      fetchJobs();
    }, []);

    const handleVideoChat = () => {
      window.open("http://localhost:3030", "_blank");
    };
  
    // Handle job application
    const handleSendRequest = async (jobId, clientId) => {
      if (!auth.freelancer) {
        toast.error("You must be logged in as a freelancer to send requests.");
        return;
      }
  
      // Check if the freelancer is available
      if (!auth.freelancer.isAvailable) {
        toast.error("You are currently hired and cannot send job requests.");
        return;
      }
  
      try {
        await axios.post(
          `${VITE_APP_API}/api/jobs/apply`,
          {
            jobId,
            clientId,
            freelancerId: auth.freelancer._id,
          },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
  
        toast.success("Job request sent successfully!");
        setRequestedJobs((prev) => new Set(prev).add(jobId)); // Update UI
      } catch (error) {
        console.error("Error sending job request:", error);
        toast.error("Failed to send job request.");
      }
    };
  
    return (
      <div className="min-h-screen p-8 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 border-b-2 border-black pb-2">Available Jobs</h1>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.length === 0 ? (
              <p className="text-gray-600">No jobs available</p>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border-2 border-black shadow-[4px_4px_0_0_#000] p-6 transition-transform hover:-translate-y-1"
                >
                  <h2 className="text-2xl font-bold mb-3">{job.title}</h2>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="bg-[#4ECDC4] text-black px-3 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] text-sm font-bold">
                      Budget: ${job.budget}
                    </span>

                    <button className="bg-[#ff6b6b] text-black px-3 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] text-sm font-bold" onClick={handleVideoChat}>Let's Chat</button>
  
                    {/* Send Request Button */}
                    <button
                      onClick={() => handleSendRequest(job._id, job.client._id)}
                      className={`px-4 py-2 border-2 border-black shadow-[2px_2px_0_0_#000] text-white font-bold transition ${
                        requestedJobs.has(job._id) || !auth.freelancer?.isAvailable
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      disabled={requestedJobs.has(job._id) || !auth.freelancer?.isAvailable}
                    >
                      {requestedJobs.has(job._id) ? "Request Sent" : "Send Request"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

export default Jobs;