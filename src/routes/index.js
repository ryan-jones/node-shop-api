const express = require('express');
const router = express.Router();
const productRoutes = require('./products');
const ordersRoutes = require('./orders');
const userRoutes = require('./users');

router.use('/products', productRoutes);

router.use('/orders', ordersRoutes);

router.use('/users', userRoutes);

module.exports = router;
