const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String }
  }
)

module.exports = mongoose.model('Product', productSchema);