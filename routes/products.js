const express = require('express'); 
const router = express.Router();
const products = require('../db/db-products');

// This will for now return a collection of products
router.get('/', (req, res) => {
  res.send(products.all());
})

// call up the products.js
// Inside the product.js it will use an add method and put the product object into collections in database
router.post('/:id', (req, res) => {
  const id = req.params.id;
  products.add(id);
  res.send(`We added ${id}`);
})

module.exports = router;
