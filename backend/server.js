const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors'); 
require('dotenv').config();

// Allow requests from both localhost and your Vercel frontend
const allowedOrigins = [
    'http://localhost:3000',
    // 'https://sentiment-analysis-insta-post-frontend.vercel.app'
    'https://faq-generator-frontend.vercel.app'
];

// CORS middleware configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            // If the origin is not in the allowedOrigins list, return an error
            return callback(new Error('Not allowed by CORS'));
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept']
}));

// Handle preflight requests (for OPTIONS method)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization, X-Requested-With,Origin,Accept');

    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }
    next();
});

// JSON body parsing middleware
app.use(express.json()); 

// Routes
app.use('/db', require('./Routes/fetch'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
