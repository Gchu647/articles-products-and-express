const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const products = require('../db/db-products');
// const validation = require('../validation.js');

router.use(bodyParser.urlencoded({extended: true }));

// This will for now return a collection of products
router.get('/', (req, res) => {
  // const id = req.params.id;
  res.send(products.all());
})

//WORKING ON THIS
router.post('/', (req, res) => {
  // validation.validateProduct(req.body);
  products.add(req.body);
  res.send(`We added ${req.body.name}`);
})

module.exports = router;
