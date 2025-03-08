import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Freelancer from '../models/Freelancer.js';
import Client from '../models/Client.js';
import dotenv from 'dotenv'



export const registerFreelancer = async (req, res) => {
    try{
        const { name, email, password, skills, experience } = req.body;
        const existingFreelancer = await Freelancer.findOne({
            email,
        });
        if(existingFreelancer){
            return res.status(400).json({ message: "Freelancer already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const freelancer = await Freelancer.create({
            name,
            email,
            password: hashedPassword,
            skills,
            experience,
        });
        const token = jwt.sign(
            { freelancerId: freelancer._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(201).json({ 
            freelancer, 
            token  , 
            message: "Freelancer created successfully" 
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const registerClient = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const existingClient = await Client.findOne({
            email,
        });
        if(existingClient){
            return res.status(400).json({ message: "Client already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const client = await Client.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign(
            { clientId: client._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(201).json({ client, token, message: "Client created successfully" });
    }catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const freelancer = await Freelancer.findOne({ email });
        const client = await Client.findOne({
            email,
        });
        if(!freelancer && !client){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if(freelancer){
            const isPasswordCorrect = await bcrypt.compare(password, freelancer.password);
            if(!isPasswordCorrect){
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign(
                { freelancerId: freelancer._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
            res.status(200).json({ freelancer, token, message: "Freelancer logged in successfully" });
        }
        if(client){
            const isPasswordCorrect = await bcrypt.compare(password, client.password);
            if(!isPasswordCorrect){
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign(
                { clientId: client._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
            res.status(200).json({ client, token , message: "Client logged in successfully" });
        }
    }catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}