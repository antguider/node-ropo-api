import express, { Application } from 'express';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes';
import { performanceLogger } from './middleware/performance';
import { PORT, API_BASE_PATH } from './config/constants';

/**
 * Initialize Express application
 */
const app: Application = express();

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());
app.use(performanceLogger);

/**
 * Routes
 */
app.use(API_BASE_PATH, orderRoutes);

/**
 * Health check endpoint
 */
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

/**
 * 404 handler
 */
app.use((_req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
});

/**
 * Start server
 */
app.listen(PORT, () => {
    console.log('=================================');
    console.log('Robo-Advisor Order Splitter API');
    console.log('=================================');
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}${API_BASE_PATH}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log('=================================\n');
});

export default app;
