import User from '../models/userModel.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    // try to log in the user by looking at their credentials.
    try {
        // Look at their email in the DB to check if the user has an account.
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'User not found.'));
        }

        // validPassword synchronously compares the password that is entered in 
        // req.body to the actual password of the user.
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (validPassword === false) {
            return next(errorHandler(400, 'Invalid Password'));
        }

        const token = jwt.sign(
            { id: validUser._id}, 
            process.env.JWT_TOKEN
        );

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }
}
