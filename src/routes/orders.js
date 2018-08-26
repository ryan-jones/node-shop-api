const express = require('express');
const router = express.Router();
const orderService = require('../services/orders.service');
const checkAuth = require('../core/auth/auth');

router.get('/', checkAuth, orderService.find);
  
router.post('/', checkAuth, orderService.add);

router.get('/:id', checkAuth, orderService.findOne);

router.patch('/:id', checkAuth, orderService.update);
  
router.delete('/:id', checkAuth, orderService.remove);

module.exports = router;