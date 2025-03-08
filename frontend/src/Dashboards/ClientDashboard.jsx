import { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import NavC from "../components/NavC";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from 'axios'
import FreelancersList from "../components/AllFreelancers";
import PaymentButton from "../components/PaymentButton";


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ClientDashboard() {
  const { auth } = useAuth();
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobRequests, setJobRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("talents");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    skillsRequired: "",
  });

  // Mock data for charts
  const paymentData = {
    labels: ["Completed", "Pending", "In Escrow"],
    datasets: [{
      data: [8, 3, 2],
      backgroundColor: ["#4ECDC4", "#FF6B6B", "#FFE66D"],
      borderColor: "#000",
      borderWidth: 2
    }]
  };

  const handleVideoChat = () => {
    window.open("http://localhost:3030", "_blank");
  };
  

  const VITE_APP_API = import.meta.env.VITE_APP_API; 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${VITE_APP_API}/api/jobs`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
  
        console.log("Fetched Jobs:", data); // Debugging: Inspect the fetched jobs
  
        if (auth.client && Array.isArray(data)) {
          // Filter jobs created by the logged-in client
          const clientJobs = data.filter(job => job.client?._id === auth.client._id);
          console.log("Client Jobs:", clientJobs); // Debugging: Inspect the filtered jobs
          setJobs(clientJobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs");
      }
    };
  
    if (auth.client) {
      fetchJobs();
    }
  }, [auth.client]);

  useEffect(() => {
    const fetchJobRequests = async () => {
      try {
        const { data } = await axios.get(`${VITE_APP_API}/api/jobs/requests/${auth.client?._id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
  
        console.log("Fetched job requests:", data.jobRequests); // ✅ Debugging log
        setJobRequests([...data.jobRequests]); // ✅ Force re-render
      } catch (error) {
        console.error("Error fetching job requests:", error);
        toast.error("Failed to fetch job requests");
      }
    };
  
    if (auth.client) {
      fetchJobRequests();
    }
  }, [auth.client]);
  
  
  
  const handleJobRequest = async (requestId, status) => {
    try {
      // Update the job request status
      await axios.patch(
        `${VITE_APP_API}/api/jobs/request/respond`,
        { requestId, status },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
  
      // If the request is accepted, update the job status to "hired"
      if (status === "accepted") {
        const request = jobRequests.find(req => req._id === requestId);
        if (request) {
          await axios.patch(
            `${VITE_APP_API}/api/jobs/${request.job._id}`,
            { status: "hired", freelancer: request.freelancer._id },
            { headers: { Authorization: `Bearer ${auth.token}` } }
          );
  
          // Update the jobs state
          setJobs(prevJobs =>
            prevJobs.map(job =>
              job._id === request.job._id
                ? { ...job, status: "hired", freelancer: request.freelancer }
                : job
            )
          );
        }
      }
  
      // Update the jobRequests state
      setJobRequests(prevRequests =>
        prevRequests.map(req =>
          req._id === requestId ? { ...req, status } : req
        )
      );
  
      toast.success(`Request ${status}`);
    } catch (error) {
      console.error(`Error ${status} request:`, error);
      toast.error(`Failed to ${status} request`);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!auth.client) return toast.error("Only clients can post jobs");

  try {
    await axios.post(`${VITE_APP_API}/api/jobs/post`, { ...formData, client: auth.client._id }, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    toast.success("Job posted successfully!");
    setFormData({ title: "", description: "", skillsRequired: "", budget: "" });

    // Fetch updated jobs
    const { data } = await axios.get(`${VITE_APP_API}/api/jobs`);
    setJobs(data.filter(job => job.client?._id === auth.client._id ));
  } catch (error) {
    toast.error("Failed to post job");
    console.error("Error posting job:", error);
  }
};


  const escrowHistoryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: "Escrow Amount ($)",
      data: [2500, 4200, 3800, 5100, 4900],
      backgroundColor: "#4ECDC4",
      borderColor: "#000",
      borderWidth: 2
    }]
  };


  return (
    <div className="bg-[#E0F4FF] min-h-screen p-8">
      <NavC/>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Client Dashboard</h1>

        {/* Navigation */}
        <div className="flex gap-4 mb-8">

          <button
            onClick={() => setActiveTab("projects")}
            className={`neo-button ${activeTab === "projects" ? "bg-[#4ECDC4]" : "bg-white"}`}
          >
            Manage Projects
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`neo-button ${activeTab === "payments" ? "bg-[#4ECDC4]" : "bg-white"}`}
          >
            Payments
          </button>
          <button
            onClick={() => setActiveTab("talents")}
            className={`neo-button ${activeTab === "talents" ? "bg-[#4ECDC4]" : "bg-white"}`}
          >
            Find Talents
          </button>
          <button
            onClick={() => setShowJobForm(true)}
            className="neo-button bg-[#FF6B6B] text-white"
          >
            Post New Job
          </button>
          
        </div>

            {/* Default Talents View */}
            {activeTab === "talents" && <FreelancersList/>}

            {/* Other Conditional Views */}
      

        {/* Job Posting Form */}
        {showJobForm && (
          <div className="bg-white neo-brutalist p-6 mb-8 animate-slideDown">
            <h2 className="text-2xl font-bold mb-4">Post New Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Job Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 neo-brutalist"
                required
              />
              <textarea
                placeholder="Job Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 neo-brutalist"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Budget ($)"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="p-2 neo-brutalist"
                  required
                />
                <input 
                  type="text"
                  placeholder="Skills"
                  value={formData.skillsRequired}
                  onChange={(e) => setFormData({...formData, skillsRequired: e.target.value})}
                  className="p-2 neo-brutalist"
                  required
                
                />
              </div>
              <button type="submit" className="neo-button bg-[#4ECDC4] text-black">
                Post Job
              </button>
            </form>
          </div>
        )}

{activeTab === "projects" && (
  <div className="space-y-6">
    {/* Open Projects */}
    <div>
      <h2 className="text-2xl font-bold mb-4">Open Projects</h2>
      {jobs
        .filter(job => job.status === "open")
        .map(job => (
          <div key={job._id} className="bg-white neo-brutalist p-6 animate-fadeIn mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-gray-600">Budget: ${job.budget}</p>
              </div>
              <span className="neo-brutalist px-3 py-1 text-sm">{job.status}</span>
            </div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
              <p className="mb-4">{job.description}</p>
              </div>
              <button className="neo-brutalist bg-[#ff6b6b] px-3 py-1 text-sm" onClick={handleVideoChat}>Let's Chat</button>
            </div>

            
          

            {/* Freelancer Requests */}
            <h4 className="text-lg font-bold mt-4">Freelancer Requests:</h4>
            {Array.isArray(jobRequests) && jobRequests.length > 0 ? (
              jobRequests
                .filter(req => req.job && req.job._id === job._id)
                .map(request => (
                  <div key={request._id} className="bg-gray-100 p-4 rounded-md mt-2">
                    {/* Freelancer Profile */}
                    <div className="mb-4">
                      <h4 className="text-lg font-bold">Freelancer Profile:</h4>
                      <div className="bg-white p-4 rounded-md">
                        <p><strong>Name:</strong> {request.freelancer.name}</p>
                        <p><strong>Email:</strong> {request.freelancer.email}</p>
                        <p><strong>Skills:</strong> {request.freelancer.skills.join(", ")}</p>
                        <p><strong>Experience:</strong> {request.freelancer.experience}</p>
                      </div>
                    </div>

                    {/* Request Status and Actions */}
                    <p><strong>Status:</strong> {request.status}</p>

                    {request.status === "pending" && (
                      <div className="mt-2">
                        <button
                          onClick={() => handleJobRequest(request._id, "accepted")}
                          className="neo-button bg-green-500 text-white mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleJobRequest(request._id, "rejected")}
                          className="neo-button bg-red-500 text-white"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No requests yet.</p>
            )}
          </div>
        ))}
    </div>

    {/* Hired Freelancers */}
    <div>
      <h2 className="text-2xl font-bold mb-4">Hired Freelancers</h2>
      {jobs
        .filter(job => job.status === "hired")
        .map(job => (
          <div key={job._id} className="bg-white neo-brutalist p-6 animate-fadeIn mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-gray-600">Budget: ${job.budget}</p>
              </div>
              <span className="neo-brutalist px-3 py-1 text-sm">{job.status}</span>
            </div>
            <p className="mb-4">{job.description}</p>

            {/* Freelancer Profile */}
            {job.freelancer && (
              <div className="mt-4">
                <h4 className="text-lg font-bold">Hired Freelancer:</h4>
                <div className="bg-gray-100 p-4 rounded-md mt-2">
                  <p><strong>Name:</strong> {job.freelancer.name}</p>
                  <p><strong>Email:</strong> {job.freelancer.email}</p>
                  <p><strong>Skills:</strong> {job.freelancer.skills.join(", ")}</p>
                  <p><strong>Experience:</strong> {job.freelancer.experience}</p>
                </div>
              </div>
            )}

            {/* Payment Button */}
            <div className="mt-4">
              <PaymentButton job={job._id} client={job.client} freelancer={job.freelancer} amount={job.budget} />
            </div>
          </div>
        ))}
    </div>

    {/* Completed Jobs */}
    <div>
      <h2 className="text-2xl font-bold mb-4">Completed Jobs</h2>
      {jobs
        .filter(job => job.status === "completed")
        .map(job => (
          <div key={job._id} className="bg-white neo-brutalist p-6 animate-fadeIn mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-gray-600">Budget: ${job.budget}</p>
              </div>
              <span className="neo-brutalist px-3 py-1 text-sm">{job.status}</span>
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
              <p className="mb-4">{job.description}</p>
              </div>
              <button className="neo-brutalist bg-[#ff6b6b] px-3 py-1 text-sm">Let's Chat</button>
            </div>

            {/* Freelancer Profile */}
            {job.freelancer && (
              <div className="mt-4">
                <h4 className="text-lg font-bold">Freelancer:</h4>
                <div className="bg-gray-100 p-4 rounded-md mt-2">
                  <p><strong>Name:</strong> {job.freelancer.name}</p>
                  <p><strong>Email:</strong> {job.freelancer.email}</p>
                  <p><strong>Skills:</strong> {job.freelancer.skills.join(", ")}</p>
                  <p><strong>Experience:</strong> {job.freelancer.experience}</p>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  </div>
)}

        {/* Payments & Escrow */}
        {activeTab === "payments" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white neo-brutalist p-6">
              <h2 className="text-2xl font-bold mb-4">Payment Distribution</h2>
              <Pie data={paymentData} />
            </div>
            <div className="bg-white neo-brutalist p-6">
              <h2 className="text-2xl font-bold mb-4">Escrow History</h2>
              <Bar data={escrowHistoryData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}