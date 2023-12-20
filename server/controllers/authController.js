import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../middleware/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json("User created succesfully!");

    } catch (error) {
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, "Invalid Credentials"));
        }
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(401, "Invalid Credentials"));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true, maxAge: 36000000 }).status(200).json(rest);

    } catch (error) {
        next(error);
    }
};

export const signOut = (req, res) => {
   try {
        res.clearCookie('access_token');
        res.status(200).json('SignOut Successful');
   } catch (error) {
        next(error);
   }
};


