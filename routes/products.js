const express = require('express'); 
const router = express.Router();
// const products = require('../db/db-products.js');

// This will for now return a collection of products
router.get((req, res) => {
  res.send('getting smoke test');
})

// call up the products.js
// Inside the product.js it will use an add method and put the product object into collections in database
router.post((req, res) => {
  res.send('baking muffins');
})

module.exports = router;
