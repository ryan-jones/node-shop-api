const mongoose = require('mongoose');
const Order = require('../schemas/orders.schema');
const Product = require('../schemas/products.schema');
const utils = require('./utils.service');

module.exports = {
	find,
	findOne,
	add,
	update,
	remove
};

function find(req, res, next) {
 return Order
  .find()
  .select('quantity product _id')
  .exec()
  .then(documents => {
    const response = {
      count: documents.length,
      data: documents.map(doc => ({
        quantity: doc.quantity,
        product: doc.product,
        request: {
          type: 'GET && PATCH',
          url: utils.createURL(process.env.dbURL, 'Orders', doc._id)
        }
      }))
    }
    res.status(200).json(response)
  })
  .catch(err => next(err))
}

function findOne(req, res, next) {
  return Order
    .findById(req.params.id)
    .select('quantity product _id')
    .exec()
    .then(doc => {
      const order = {
        data: { ...doc._doc },
        request: {
          type: 'GET && PATCH',
          url: utils.createURL(process.env.dbURL, 'Orders', doc._id)
        }
      }
      res.status(200).json(order);
    })
    .catch(err => next(err))
}

function add(req, res, next) {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found'})
      }
      const newOrder = new Order(
        {
          _id: new mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product
        }
      );
      return newOrder.save()
    })
    .then(doc => {
      res.status(201).json({
        message: 'successfully added'
      });
    })
    .catch(err => next(err))
}

function update(req, res, next) {
  const orderId = req.params.id;
  const { name, price } = req.body;
  const updateOpts = { name, price };

  return Order.findOneAndUpdate(orderId, { $set: updateOpts })
    .exec()
    .then((result, err) =>{
      if (err) {
        res.status(404).json({ message: err })
      }
      res.status(200).json({ data: result });
    })
    .catch(err => next(err))
}

function remove(req, res, next) {
  return Order.remove({ _id: req.params.id })
    .exec()
    .then(
      result => res.status(200).json({ message: 'successfully deleted', data: result }),
      err => res.status(404).json({ message: 'No Order found for specified id'}))
    .catch(err => next(err))
}