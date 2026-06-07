import userModel from '../models/user.model';
import type { Request, Response } from "express";
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try{
        const existingUser = await userModel.findOne({ email });

        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    }
    catch(error: any){
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try{
        const user = await userModel.findOne({ email });

        if(!user){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    }
    catch(error: any){
        res.status(500).json({ message: error.message });
    }
}
