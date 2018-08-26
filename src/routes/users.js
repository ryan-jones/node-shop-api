const express = require('express');
const router = express.Router();
const userService = require('../services/users.service');

router.get('/', userService.find);

router.post('/signup', userService.signup);

router.post('/login', userService.login);

router.get('/:id', userService.findOne);

router.patch('/:id', userService.update);

router.delete('/:id', userService.remove);



module.exports = router;