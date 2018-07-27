const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const products = require('../db/db-products');
const productReqCheck = require('../middleware/productReqCheck');

router.use(bodyParser.urlencoded({extended: true }));

// this will for now return a collection of products
router.get('/', (req, res) => {
  const collection = products.all();
  res.render('products/index', {collection: collection});
});

// adds a new product to our collection after the product is validated
router.post('/', productReqCheck, (req, res) => {
  products.add(req.body);
  res.send(`We added ${req.body.name}`);
});

// make changes to a prduct after the id is validated
router.put('/:id', productReqCheck, (req, res) => {
  const collection = products.all();
  const id = req.params.id;
  const matchIndex = collection.findIndex(element => {
    return Number(element.id) === Number(req.body.id);
  });

  collection[matchIndex].name = req.body.name;
  collection[matchIndex].price = parseFloat(req.body.price);
  collection[matchIndex].inventory = parseFloat(req.body.inventory);

  res.send(`You made changes to item id: ${id}`);
});

module.exports = router;