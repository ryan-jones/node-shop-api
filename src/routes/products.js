const express = require('express');
const router = express.Router();
const products = require('../services/products.service');
const upload = require('../services/upload-image.service');
const checkAuth = require('../core/auth/auth');

/* GET Products listing. */
router.get('/', products.find);

router.post('/', checkAuth, upload.single('productImage'), products.add);

router.get('/:id', products.findOne);

router.patch('/:id', products.update);

router.delete('/:id', products.remove);

module.exports = router;
