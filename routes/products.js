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
  const collection = products.all();
  const matchIndex = collection.findIndex(element => {
    return Number(element.id) === Number(id);
  });

  if(matchIndex === -1) {
    res.status(404).send('Item not found!');
  } else {
    const productInfo =  products.fetchByIndex(matchIndex);
    res.render('products/product',productInfo);
  }
});

// adds a new product to our collection after the product is validated
router.post('/', productReqCheck, (req, res) => {
  products.add(req.body);
  res.send(`We added ${req.body.name}`);
});

// make changes to a prduct after the id is validated
router.put('/:id', productReqCheck, (req, res) => {
  const id = req.params.id;
  let editCheck = products.edit(req.body);

  if(editCheck) {
    res.send(`You made changes to item id: ${id}`); 
  } else {
    res.status(404).send('Item not found!');
  }
});

module.exports = router;