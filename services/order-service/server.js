const express = require('express');

const app = express();
const PORT = 5003;

// Sample order data
const orders = [
    { id: 1, userId: 1, productId: 1, quantity: 1, total: 45000 },
    { id: 2, userId: 2, productId: 2, quantity: 2, total: 50000 },
    { id: 3, userId: 3, productId: 3, quantity: 1, total: 3500 },
    { id: 4, userId: 4, productId: 4, quantity: 2, total: 5000 },
    { id: 5, userId: 5, productId: 5, quantity: 1, total: 1500 }
];

// GET /orders
app.get('/orders', (req, res) => {
    console.log('Order Service: Returning', orders.length, 'orders');

    res.json({
        service: 'Order Service',
        status: 'success',
        count: orders.length,
        data: orders,
        timestamp: new Date().toISOString()
    });
});

// Health check
app.get('/ping', (req, res) => {
    res.json({
        status: 'online',
        service: 'Order Service'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('========================================');
    console.log('ORDER SERVICE STARTED');
    console.log('========================================');
    console.log(`Port: ${PORT}`);
    console.log(`GET /orders - Returns ${orders.length} orders`);
    console.log(`GET /ping - Health check`);
    console.log('========================================');
});