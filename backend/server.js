// Import necessary modules
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// Load environment variables
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
// Define port from environment variable or fallback to 5000
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Create express app
const app = express();

// Body parser middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Root route that sends back a simple message
// app.get('/', (req, res) => {
//     res.send('Server is ready');
// });

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);


app.get('/api/config/paypal', (req, res) =>
res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound);
app.use(errorHandler);


// Start listening on the defined port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});