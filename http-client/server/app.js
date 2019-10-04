const mongoose = require('mongoose');
const Product = require('./product');
const bodyparser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/http_client', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var myLogger = function(req, res, next) {
  console.log(req.body);
  next()
};

app.get('/products', (req, res) => {
  Product.find({}).lean().exec((err, data) => {
    if (err) return res.status(500).json({
      error: err,
      message: 'Internal error.'
    })
    else res.status(200).json(data);
  });
})

app.get('/productserr', (req, res) => {
  setTimeout(
    () => {
      res.status(500).send({
        msg: 'Error message from server'
      })
    }, 2000
  );
})


/*

app.get('/products/:text', (req, res) => {
  const text = req.params.text;
  const query = { $or: [
    { name: { $regex: text, $options: 'i'} },
    { department: { $regex: text, $options: 'i'} },
    { price: { $regex: text, $options: 'i'} },
  ]}

  Product.find(query).lean().exec((err, data) => {
    if (err) return res.status(500).json({
      error: err,
      message: 'Internal error.'
    })
    else res.status(200).json(data);
  });
})
*/

app.use(function(req, res, next) {
  res.status(404).send('Route does not exist');
})

app.listen(9000);