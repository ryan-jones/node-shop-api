const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');
const upload = require('../middlewares/images/upload-image');
const checkAuth = require('../middlewares/auth/auth');

/* GET Products listing. */
router.get('/', productsCtrl.find);

router.post('/', checkAuth, upload.single('productImage'), productsCtrl.add);

router.get('/:id', productsCtrl.findOne);

router.patch('/:id', checkAuth, productsCtrl.update);

router.delete('/:id', checkAuth, productsCtrl.remove);

module.exports = router;
