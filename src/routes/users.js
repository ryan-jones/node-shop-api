const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.get('/', userCtrl.find);

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

router.get('/:id', userCtrl.findOne);

router.patch('/:id', userCtrl.update);

router.delete('/:id', userCtrl.remove);


module.exports = router;