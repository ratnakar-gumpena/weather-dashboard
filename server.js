const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for external applications like Salesforce
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your existing frontend)
app.use(express.static(path.join(__dirname)));

// API Routes
app.use('/api', weatherRoutes);

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Weather Dashboard API is running',
        timestamp: new Date().toISOString()
    });
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        error: 'API endpoint not found',
        message: `Route ${req.originalUrl} does not exist`
    });
});

// Handle 404 for other routes - serve index.html (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong!'
    });
});

app.listen(PORT, () => {
    console.log(`🌤️  Weather Dashboard Server running on port ${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔗 API: http://localhost:${PORT}/api/weather/:city`);
    console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
});