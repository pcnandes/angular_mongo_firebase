const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const department_controller = require('./department_controller');
const product_controller = require('./department_controller');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/http_app', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use('/departments', department_controller);
app.get('/products', product_controller);

app.use(function(req, res, next) {
  res.status(404).send('Route does not exist');
})

app.listen(3000);