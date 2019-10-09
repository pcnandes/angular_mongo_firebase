const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var departmentSchema = new Schema({
  name: String,
}, { versionKey: false })

// versionKey: false -> para cada produto ele geraria uma versao

module.exports = mongoose.model('Department', departmentSchema);