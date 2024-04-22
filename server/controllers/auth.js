import User from '../models/userModel.js';
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (
        !username || 
        !email || 
        !password ||
        username === '' ||
        email === '' ||
        password === ''
    ) {
        return res.status(400).json({ 
            message: "All fields are required."
        })
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
        res.status(500).json({ message: error.message })
    }
}