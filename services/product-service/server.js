const express = require('express');

const app = express();
const PORT = 5002;

// Sample product data
const products = [
    { id: 1, name: 'Laptop', price: 45000, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 25000, category: 'Electronics' },
    { id: 3, name: 'Headphones', price: 3500, category: 'Accessories' },
    { id: 4, name: 'Keyboard', price: 2500, category: 'Accessories' },
    { id: 5, name: 'Mouse', price: 1500, category: 'Accessories' }
];

// GET /products
app.get('/products', (req, res) => {
    console.log('Product Service: Returning', products.length, 'products');

    res.json({
        service: 'Product Service',
        status: 'success',
        count: products.length,
        data: products,
        timestamp: new Date().toISOString()
    });
});

// Health check
app.get('/ping', (req, res) => {
    res.json({
        status: 'online',
        service: 'Product Service'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('========================================');
    console.log('PRODUCT SERVICE STARTED');
    console.log('========================================');
    console.log(`Port: ${PORT}`);
    console.log(`GET /products - Returns ${products.length} products`);
    console.log(`GET /ping - Health check`);
    console.log('========================================');
});