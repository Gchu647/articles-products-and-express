const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const products = require('../db/db-products');
const productReqCheck = require('../middleware/productReqCheck');

router.use(bodyParser.urlencoded({extended: true }));

// this will return a collection of products
router.get('/', (req, res) => {
  const collection = products.all();
  res.render('products/index', {collection: collection});
});

// this will return a specific product
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const fetchedProduct = products.fetchById(id);
  console.log(fetchedProduct);

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
    res.send(`We added ${req.body.name}`);
  } else {
    res.status(400).send(res.inputError.errorMessage);
  }
});

// make changes to a prduct after the id is validated
router.put('/:id', productReqCheck, (req, res) => {
  const id = req.params.id;

  if(res.inputError.errorMessage.length === 0) { // initial error check
    let editCheck = products.edit(req.body); // attempt to edit product

    if(editCheck) {
      res.send(`You made changes to item id: ${id}`); 
    } else {
      res.status(404).send('Item not found!');
    }
  } else {
    res.status(400).send(res.inputError.errorMessage);
  }
});

module.exports = router;