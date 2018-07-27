const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const products = require('../db/db-products');

router.use(bodyParser.urlencoded({extended: true }));

// this will for now return a collection of products
router.get('/', (req, res) => {
  res.send(products.all());
});

// Our put method can find the index to database
router.put('/', (req, res) => {
  let collection = products.all();

  collection.forEach((element, index) => {    
    if(element.id === Number(req.body.id)) {
      res.send('we found a matching ID!');
    }
  });
})

// adds a new product to our collection after the product is validated
router.post('/', (req, res) => {
  validateProduct(req, res);
});

function validateProduct(req, res) {
  let nameCheck = (req.body.name && typeof req.body.name === 'string');
  let priceCheck = (req.body.price && !isNaN(req.body.price));
  let inventoryCheck = (req.body.inventory && !isNaN(req.body.inventory));

  if(!nameCheck) {
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