import express from "express";
const router = express.Router();

import {getProductById, getProducts} from "../controllers/productController.js";


// Route to get all products
router.route('/').get(getProducts);

// Route to get a specific product by its ID
router.route('/:id').get(getProductById);


export default router;