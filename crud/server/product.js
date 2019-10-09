const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
  // vai gerar um array de IDs
  // ref: 'Department' -> indica qual documento se refere
  departments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Department'}]
}, { versionKey: false })

// versionKey: false -> para cada produto ele geraria uma versao

module.exports = mongoose.model('Product', productSchema);