import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';

dotenv.config();
const app = express();
// JSON is allowed to be used
app.use(express.json());

mongoose.connect(
        process.env.MONGO_URI
    )
    .then(() => {
        console.log('MongoDB is connected to the app...');
    });

// Test API
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

// Middleware for handling errors;
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(3000, () => {
    console.log('Server is up and listening on port 3000...');
});

