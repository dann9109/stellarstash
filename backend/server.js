// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Define port from environment variable or fallback to 5000
const port = process.env.PORT || 5000;

// Root route that sends back a simple message
app.get('/', (req, res) => {
    res.send('Server is ready');
});

// Route to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Route to get a specific product by its ID
app.get('/api/products/:id', (req, res) => {
    // Extract the product ID from the URL parameters
    const productId = req.params.id;

    // Find the product in the data array
    const product = products.find((p) => p._id === productId);

    if (product) {
        // Send the product back if found
        res.json(product);
    } else {
        // Send a 404 status code if the product is not found
        res.status(404).send({ message: 'Product not found' });
    }
});

// Start listening on the defined port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});