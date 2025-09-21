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

// API Routes
app.use('/api', weatherRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Weather Dashboard API is running',
        timestamp: new Date().toISOString()
    });
});

// Serve static files only if not in production (for local development)
if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname)));

    // Serve index.html for the root route (local development only)
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // Handle 404 for other routes - serve index.html (SPA behavior, local only)
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
}

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        error: 'API endpoint not found',
        message: `Route ${req.originalUrl} does not exist`
    });
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
    console.log(`🚀 CI/CD Pipeline: Active and deployed from GitHub!`);
});