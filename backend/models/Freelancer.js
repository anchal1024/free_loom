import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    experience: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Freelancer', freelancerSchema);