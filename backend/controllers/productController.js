import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/Product.js";


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc Fetch a product
// @route GET /api/products
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        // Send the product back if found
        res.json(product);
    } else {
        // Send a 404 status code if the product is not found
        res.status(404);
        throw new Error('Product not found');
    }
});

export {getProducts, getProductById};