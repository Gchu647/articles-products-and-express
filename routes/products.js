const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const products = require('../db/db-products');
const reqCheck = require('../middleware/productReqCheck');

router.use(bodyParser.urlencoded({extended: true }));

// this will for now return a collection of products
router.get('/', (req, res) => {
  const collection = products.all();
  res.render('products/index', {collection: collection});
});

// Our put method can find the index to database
router.put('/:id', (req, res) => {
  const collection = products.all();
  let errorMessage = validateChange(req); // test if it can be the same line.

  if(errorMessage) {
    res.status(400).send(errorMessage);
  } else {
    const matchIndex = collection.findIndex(element => {
      return Number(element.id) === Number(req.body.id);
    });
  
    collection[matchIndex].name = req.body.name;
    collection[matchIndex].price = parseFloat(req.body.price);
    collection[matchIndex].inventory = parseFloat(req.body.inventory);

    res.send("we put something!");
  }
});

function validateChange(req) {
  const idCheck = (req.body.id && !isNaN(req.body.id));
  const nameCheck = (req.body.name && typeof req.body.name === 'string');
  const priceCheck = (req.body.price && !isNaN(req.body.price));
  const inventoryCheck = (req.body.inventory && !isNaN(req.body.inventory));
  let errorMessage;

  if(!idCheck) {
    errorMessage = 'Needs proper id key and value';
  } else if(!nameCheck) {
    errorMessage = 'Needs proper name key and value';
  } else if(!priceCheck) {
    errorMessage = 'Needs proper price key and value';
  } else if (!inventoryCheck) {
    errorMessage = 'Needs proper inventory key and value';
  } else {
    errorMessage = null;
  }

  return errorMessage;
}

// adds a new product to our collection after the product is validated
router.post('/', (req, res) => {
  console.log(reqCheck());
  validateProduct(req, res);
});

function validateProduct(req, res) {
  const idCheck = (req.body.id && !isNaN(req.body.id));
  const nameCheck = (req.body.name && typeof req.body.name === 'string');
  const priceCheck = (req.body.price && !isNaN(req.body.price));
  const inventoryCheck = (req.body.inventory && !isNaN(req.body.inventory));
  console.log(idCheck);

  if(idCheck) {
    res.status(400).send('Ids are automatically generated');
  } else if(!nameCheck) {
    res.status(400).send('Needs proper name key and value');
  } else if(!priceCheck) {
    res.status(400).send('Needs proper price key and value');
  } else if (!inventoryCheck) {
    res.status(400).send('Needs proper inventory key and value');
  } else {
    products.add(req.body);
    res.send(`We added ${req.body.name}`);
  }
}

module.exports = router;

/*
router.put('/:id', (req, res) => {
  const idCheck = req.params.id
  let location = products.location(idCheck);
  res.send(location);
})
*/

/*
for (let x in req.body) {
  if(req.body[x] === collectionID object with the same property) {

  }
}
*/