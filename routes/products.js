const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const methodOveride = require('method-override');
const products = require('../db/db-products');
const productReqCheck = require('../middleware/productReqCheck');

router.use(bodyParser.urlencoded({extended: true }));
router.use(methodOveride('_method'));

// this will return a collection of products
router.get('/', (req, res) => {
  const collection = products.all();
  res.render('products/index', {collection: collection});
});

// open the page to add products
router.get('/new', (req, res) => {
  res.render('products/new');
})

// TEMPORARY route
router.get('/edit', (req, res) => {
  res.render('products/edit');
})

// this will return a specific product
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const fetchedProduct = products.fetchById(id);

  if(fetchedProduct) {
    res.render('products/product',fetchedProduct);
  } else{
    res.status(404).send('Item not found!');
  }
});

// adds a new product to our collection after the product is validated
router.post('/', productReqCheck, (req, res) => {
  if(res.inputError.errorMessage.length === 0) { // initial error check
    products.add(req.body);
    res.redirect('/products');
  } else {
    res.status(400).send(res.inputError.errorMessage);
  }
});

// make all the edit names to change
// make changes to a prduct after the id is validated
router.put('/:id', productReqCheck, (req, res) => {
  if(res.inputError.errorMessage.length === 0) { // initial error check
    let editCheck = products.edit(req.body); // attempt to edit product

    if(editCheck) {
      res.redirect(`/products/${req.body.id}`); 
    } else {
      res.status(404).send('Item not found!');
    }
  } else {
    res.status(400).send(res.inputError.errorMessage);
  }
});

// Only works on POSTMAN for now
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const removeCheck = products.remove(id);
  console.log('deleting Id-' + id);

  if(removeCheck) {
    res.redirect('/products'); 
  } else {
    res.status(404).send('Item not found!');
  }
});

module.exports = router;