const express = require('express');
const router = express.Router();
const Department = require('./department')

router.post('/', (req, res) => {
  console.log(req.body);
  let d = new Department({name: req.body.name})
  d.save((err, dep) => {
    if (err)
      res.status(500).send(err);
    else
      res.status(201).send(dep);
  })
})

router.get('/', (req, res) => {

  Department.find().exec((err, deps) => {
    if (err)
      res.status(500).send(err);
    else
      res.status(200).send(deps);
  })
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Department.deleteOne({_id: id}, (err) => {
    if (err)
      res.status(500).send(err);
    else
      res.status(200).send({});
  })
})

router.patch('/:id', (req, res) => {
  Department.findById(req.params.id, (err, dep) => {
    if (err)
      res.status(500).send(err);
    else if (!dep)
      res.status(404).send({});
    else {
      dep.name = req.body.name;
      dep.save()
        .then((d) => res.status(200).send(d))
        .catch((e) => res.status(500).send(err));
    }
  })
})

module.exports = router;