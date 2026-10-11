const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Spoke service URLs
const USER_SERVICE = 'http://localhost:5001';
const PRODUCT_SERVICE = 'http://localhost:5002';
const ORDER_SERVICE = 'http://localhost:5003';

// Home route
app.get('/', (req, res) => {
    res.json({
        service: 'API Gateway',
        status: 'online',
        port: PORT
    });
});

// Proxy: Users
app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get(`${USER_SERVICE}/users`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            service: 'User Service',
            status: 'offline',
            error: error.message
        });
    }
});

// Proxy: Products
app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get(`${PRODUCT_SERVICE}/products`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            service: 'Product Service',
            status: 'offline',
            error: error.message
        });
    }
});

// Proxy: Orders
app.get('/api/orders', async (req, res) => {
    try {
        const response = await axios.get(`${ORDER_SERVICE}/orders`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            service: 'Order Service',
            status: 'offline',
            error: error.message
        });
    }
});

// Dashboard - aggregate all services
app.get('/api/dashboard', async (req, res) => {
    try {
        const [users, products, orders] = await Promise.all([
            axios.get(`${USER_SERVICE}/users`),
            axios.get(`${PRODUCT_SERVICE}/products`),
            axios.get(`${ORDER_SERVICE}/orders`)
        ]);

        res.json({
            status: 'success',
            message: 'Dashboard data aggregated successfully',
            users: users.data,
            products: products.data,
            orders: orders.data,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Unable to retrieve dashboard data',
            error: error.message
        });
    }
});

// Service status
app.get('/api/status', async (req, res) => {
    const status = {
        gateway: 'online',
        services: {
            users: 'offline',
            products: 'offline',
            orders: 'offline'
        }
    };

    try {
        await axios.get(`${USER_SERVICE}/ping`);
        status.services.users = 'online';
    } catch (error) {}

    try {
        await axios.get(`${PRODUCT_SERVICE}/ping`);
        status.services.products = 'online';
    } catch (error) {}

    try {
        await axios.get(`${ORDER_SERVICE}/ping`);
        status.services.orders = 'online';
    } catch (error) {}

    res.json(status);
});

// Start Gateway
app.listen(PORT, () => {
    console.log('========================================');
    console.log('API GATEWAY STARTED');
    console.log('========================================');
    console.log(`Port: ${PORT}`);
    console.log('GET /api/users');
    console.log('GET /api/products');
    console.log('GET /api/orders');
    console.log('GET /api/dashboard');
    console.log('GET /api/status');
    console.log('========================================');
});