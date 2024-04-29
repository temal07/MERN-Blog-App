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

export const google = async (req, res, next) => {
    const { email, name, googlePhotoURL } = req.body;

    try {
        const user = await findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id}, 
                process.env.JWT_TOKEN
            );
    
            const { password: pass, ...rest } = validUser._doc;
    
            res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(rest);
        } else {
            // the model doesn't allow a user to 
            // be registered without a password 
            // But we will register a new user 
            // without a password using google auth

            // in order to accomplish this, we will 
            // generate a random password and then users
            // will be able to change their password
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).splice(-3),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoURL,
            });

            await newUser.save();

            const token = jwt.sign({id: newUser._id}, process.env.JWT_TOKEN);
            const {password, ...rest} = newUser._doc;

            res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json(rest);
        }
    } catch (error) {
        
    }
}