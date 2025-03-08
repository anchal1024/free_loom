import Job from "../models/Job.js";
import JobRequest from "../models/JobRequest.js";
import Freelancer from "../models/Freelancer.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, skillsRequired, budget , client } = req.body;
        const job = await Job.create({
            title,
            description,
            client,
            skillsRequired,
            budget,
            client
        });
        await job.save();
        res.status(201).json({ job, message: "Job created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("client", "name email")
      .populate("freelancer", "name email skills experience"); // Ensure freelancer is populated
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const applyForJob = async (req, res) => {
  try {
    const { jobId, freelancerId, clientId } = req.body;

    // Check if the freelancer is available
    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer.isAvailable) {
      return res.status(400).json({ success: false, message: "You are currently hired and cannot send job requests." });
    }

    // Check if the freelancer has already applied
    const existingRequest = await JobRequest.findOne({ job: jobId, freelancer: freelancerId });
    if (existingRequest) {
      return res.status(400).json({ success: false, message: "You have already applied for this job." });
    }

    // Add the freelancer to the job's applicants list
    await Job.findByIdAndUpdate(jobId, {
      $push: { applicants: freelancerId },
    });

    // Create a new job request
    const jobRequest = new JobRequest({
      job: jobId,
      freelancer: freelancerId,
      client: clientId,
    });

    await jobRequest.save();

    res.json({ success: true, message: "Job application sent successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJobRequests = async (req, res) => {
    try {
        const { clientId } = req.params;
        
        const jobRequests = await JobRequest.find({ client: clientId, status: "pending" })
            .populate("freelancer", "name email skills experience")
            .populate("job", "title description budget");
        
        res.json({ success: true, jobRequests });
    }   catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }   
};    

// In your jobController.js
// In your jobController.js
export const respondToJobRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    // Update the job request status
    const updatedRequest = await JobRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    // If the request is accepted, update the job status to "hired"
    if (status === "accepted") {
      await Job.findByIdAndUpdate(
        updatedRequest.job,
        { status: "hired", freelancer: updatedRequest.freelancer },
        { new: true }
      );
    }

    res.status(200).json({ success: true, message: `Request ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

  export const updateJobStatus = async (req, res) => {
    try {
      const { jobId } = req.params;
      const { status, freelancer } = req.body;
  
      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { status, freelancer },
        { new: true }
      );
  
      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      res.status(200).json({ job: updatedJob, message: "Job updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
