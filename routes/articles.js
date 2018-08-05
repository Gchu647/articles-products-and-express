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

// the page to post your articles
router.get('/new', (req, res) => {
  res.render('articles/new');
})

// posting a new article
router.post('/', payload.articleReqCheck, (req, res) => {
  if(res.inputError.message.length > 0) { // initial error check
    res.inputError.showContent = true;
    res.render('articles/new',res.inputError);
  } else {
    const article = {
      'title': req.body.title,
      'body': req.body.body,
      'author': req.body.author,
      'urltitle': req.body.title.split(' ').join('%20')
    };

    console.log('Im sending this in', article)

    knex('articles').insert(article)
    .then(() => {
      res.redirect('/articles');
    })
    .catch(err => res.status(404).render('404',{'message': err.message}));
  }
});

module.exports = router;