const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/userRoute');


mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => {
        console.log('MongoDB is connected to the app...');
    })

const app = express();

// Test API

app.use('/api/user', userRoute);

app.listen(3000, () => {
    console.log('Server is up and listening on 3000...');
});

