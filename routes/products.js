const express = require('express'); 
const router = express.Router();
// const products = require('../db/db-products');
const payload = require('../middleware/payload');
const knex = require('../db/knex');

// this will return a collection of products
router.get('/', (req, res) => {
  knex('products').select('*')
    .then(products => {
      res.render('products/index', {collection: products});
    })
    .catch(err => res.status(400).send(err));
});

// returns a product matching the id
router.get('/:product_id', (req, res) => {
  const id = req.params.product_id;
  knex('products').where('id', id).first()
    .then(fetchedProduct => {
      if(!fetchedProduct) {
        throw Error();
      }

      res.render('products/product', fetchedProduct);
    })
    .catch(err => res.status(400).send('Product does not exist'));

});

// add a new product to our collection after the product is validated
router.post('/', payload.productReqCheck, (req, res) => {
  //Need to catch payload error
  const products = {
    'name': req.body.name,
    'price': parseFloat(req.body.price),
    'inventory': parseInt(req.body.inventory)
  };

  knex('products').insert(products)
  .then(() => {
    res.redirect('/products');
  })
  .catch(err => res.status(400).send(err));
});

// Edit a product after the id is validated
router.put('/:product_id', payload.productReqCheck, (req, res) => {
  //Need to catch payload error
  const id = req.body.id;
  const products = {
    'id': id,
    'name': req.body.name,
    'price': parseFloat(req.body.price),
    'inventory': parseInt(req.body.inventory),
    'updated_at': knex.fn.now()
  };

  knex('products').update(products).where('id', id)
  .then(() => {
    res.redirect(`/products/${id}`);
  })
  .catch(err => res.status(400).send(err));
});

module.exports = router;