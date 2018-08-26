const mongoose = require('mongoose');
const Product = require('../schemas/products.schema');
const utils = require('../services/utils.service');

module.exports = {
	find,
	findOne,
	add,
	update,
	remove
};

function find(req, res, next) {
 return Product
  .find()
  .select('name price _id productImage')
  .exec()
  .then(documents => {
    const response = {
      count: documents.length,
      data: documents.map(doc => ({
        name: doc.name,
        price: doc.price,
        productImage: doc.productImage,
        url: {
          type: 'GET && PATCH',
          path: utils.createURL('products', doc._id)
        }
      }))
    }
    res.status(200).json(response)
  })
  .catch(err => next(err))
}

function findOne(req, res, next) {
  return Product
    .findById(req.params.id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
      const product = {
        message: 'Product found',
        data: { ...doc._doc },
        request: {
          type: 'GET && PATCH',
          url: utils.createURL('products', doc._id)
        }
      }
      res.status(200).json(product);
  })
  .catch(err => next(err))
}

function add(req, res, next) {
  const newProduct = new Product(
    {
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path
    }
  );
  return newProduct.save()
    .then(doc => {
      const { _id, name, price, productImage } = doc;
      res.status(200).json({
        message: 'successfully added',
        product: {
          name,
          price,
          productImage,
          url: utils.createURL('products', _id)
        }
      });
    })
    .catch(err => next(err));
}

function update(req, res, next) {
  const id = req.params.id;
  const { name, price } = req.body;
  return Product.findOneAndUpdate(id, { $set: { name, price } })
    .exec()
    .then(result => res.status(200).json({ data: result }))
    .catch(err => next(err))
}

function remove(req, res, next) {
  return Product.remove({ _id: req.params.id })
    .exec()
    .then(result => res.status(200).json({ message: 'successfully deleted', data: result }))
    .catch(err => next(err))
}