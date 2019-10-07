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

app.get('/productsdelay', (req, res) => {
  setTimeout(
    () => {
      Product.find({}).lean().exec((err, data) => {
        if (err) return res.status(500).json({
          error: err,
          message: 'Internal error.'
        })
        else res.status(200).json(data);
      });
    }, 2000
  );
})

app.get('/products_ids', (req, res) => {
  Product.find({}).lean().exec((err, data) => {
    if (err) return res.status(500).json({
      error: err,
      message: 'Internal error.'
    })
    else res.status(200).send(data.map(d => d._id));
  });
})

app.get('/products/name/:id', (req, res) => {
  const id = req.params.id;
  Product.findById(id, (err, data) => {
    if (err) return res.status(500).json({
      error: err,
      message: 'Internal error.'
    })
    else if (!data ) res.status(404).send({});
    else res.status(200).send(data.name);
  });
})

app.post('/products', (req, res) => {
  p = new Product({
    name: req.body.name,
    department: req.body.department,
    price: req.body.price
  })
  p.save((err, prod) => {
    if (err) res.status(500).send(err)
    else res.status(201).send(prod);
  })
})

app.delete('/products/:id', (req, res) => {
  Product.deleteOne({_id: req.params.id},
    (err) => {
      if (err) res.status(500).send(err)
      else res.status(200).send({});
    });
})


app.patch('/products/:id', (req, res) => {
  const id = req.params.id;
  Product.findById(id, (err, data) => {
    if (err) return res.status(500).json({
      error: err,
      message: 'Internal error.'
    })
    else if (!data ) res.status(404).send({});
    else {
      data.name = req.body.name;
      data.department = req.body.department;
      data.price = req.body.price;

      data.save((err, prod) => {
        if (err) return res.status(500).json({
          error: err,
          message: 'Internal error.'
        })
        else res.status(200).send(prod);
      })
    }
  });
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