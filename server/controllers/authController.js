import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../middleware/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res, next) => {
    try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json("User created succesfully!");

    } catch (error) {
        next(error);
    }
}



