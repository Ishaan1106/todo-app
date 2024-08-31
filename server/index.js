require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/todo-routes');

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for port if available

// Middleware to parse JSON bodies
app.use(express.json());

// Connection URI from environment variable
const dbURI = process.env.MONGODB_URI;

// Connect to the database
mongoose.connect(dbURI, {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
})
.then(() => {
    console.log("Connected to the database");

    // Use the router after the database connection is established
    app.use('/api', router); // All routes are gonna start with `/api`

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("Failed to connect to the database. Server not started.", error);
});