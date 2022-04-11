const express = require('express');

const ProductController = require('../Controllers/ProductController');

const productRoutes = express.Router();


productRoutes.get('/api/product/:_id', ProductController.index);
productRoutes.post('/api/product/create/:_id', ProductController.create);
productRoutes.get('/api/product/update', ProductController.update);
productRoutes.get('/api/product/delete', ProductController.delete);



module.exports = productRoutes;