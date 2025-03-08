import Freelancer from "../models/Freelancer.js"; 


export const getFreelancers =  async (req, res) => {
    try {
        const { skill } = req.query; 
        let query = { isAvailable: true };

        if (skill) {
            query.skills = skill; 
        }

        const freelancers = await Freelancer.find(query);
        res.json(freelancers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching freelancers", error });
    }
};


// Update freelancer availability
export const updateFreelancerAvailability = async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const { isAvailable } = req.body;

    const updatedFreelancer = await Freelancer.findByIdAndUpdate(
      freelancerId,
      { isAvailable },
      { new: true }
    );

    if (!updatedFreelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.status(200).json({
      freelancer: updatedFreelancer,
      message: "Freelancer availability updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update freelancer availability", error: error.message });
  }
};
