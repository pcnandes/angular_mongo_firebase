const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  department: String,
  price: Number
})

// o mongo vai criar a coleção products
module.exports = mongoose.model('Product', productSchema);