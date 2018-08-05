const express = require('express'); 
const router = express.Router();
const payload = require('../middleware/payload');
const knex = require('../db/knex');

// this will return a collection of articles
router.get('/', (req, res) => {
  knex('articles').select('*')
    .then(articles => {
      res.render('articles/index', {collection: articles});
    })
    .catch(err => res.status(404).render('404',{'message': err.message}));
});

module.exports = router;