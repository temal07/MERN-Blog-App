import User from '../models/userModel.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/errorHandler.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (
        !username || 
        !email || 
        !password ||
        username === '' ||
        email === '' ||
        password === ''
    ) {
        next(errorHandler(400, 'All fields are required.'));
    }

    // hash the password so that it isn't seen on MongoDB's website.
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // create the registered user based on their 
    // signup credentials.
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch(error) {
        // use the error from the middleware;
        next(error);
    }
}
