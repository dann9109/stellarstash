// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
// Define port from environment variable or fallback to 5000
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Create express app
const app = express();

// Root route that sends back a simple message
app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);


// Start listening on the defined port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});