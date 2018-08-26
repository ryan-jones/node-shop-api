const express = require('express');
const router = express.Router();
const orderService = require('../services/orders.service');

router.get('/', orderService.find);
  
router.post('/', orderService.add);

router.get('/:id', orderService.findOne);

router.patch('/:id', orderService.update);
  
router.delete('/:id', orderService.remove);

module.exports = router;