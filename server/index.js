import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';

dotenv.config();
const app = express();

mongoose.connect(
        process.env.MONGO_URI
    )
    .then(() => {
        console.log('MongoDB is connected to the app...');
    });

// Test API

app.use('/api/user', userRoute);

app.listen(3000, () => {
    console.log('Server is up and listening on 3000...');
});

