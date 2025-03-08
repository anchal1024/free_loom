import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Freelancer",
    default: null,
  },
  status: {
    type: String,
    required: true,
    enum: ["open", "hired", "completed"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  skillsRequired: {
    type: [String],
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  applicants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Freelancer",
    default: [],
  },
});

export default mongoose.model("Job", jobSchema);