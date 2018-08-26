const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders');
const checkAuth = require('../middlewares/auth/auth');

router.get('/', checkAuth, orderCtrl.find);
  
router.post('/', checkAuth, orderCtrl.add);

router.get('/:id', checkAuth, orderCtrl.findOne);

router.patch('/:id', checkAuth, orderCtrl.update);
  
router.delete('/:id', checkAuth, orderCtrl.remove);

module.exports = router;