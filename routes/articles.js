const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const methodOveride = require('method-override');
const articles = require('../db/db-articles');
const payload = require('../middleware/payload');

router.use(bodyParser.urlencoded({extended: true }));
router.use(methodOveride('_method'));

// this will return a collection of articles
router.get('/', (req, res) => {
  const collection = articles.all();
  res.render('articles/index', {collection: collection});
});

// open the page to add articles
router.get('/new', (req, res) => {
  res.render('articles/new');
});

// brings up the product editing page
router.get('/:id/edit', (req, res) => {
  res.render('articles/edit', req.body);
});

// fetches a article based on the title
router.get('/:id', (req, res) => {
  const title = req.params.id;
  const fetchedArticle = articles.fetchByTitle(title);

  if(fetchedArticle) {
    res.render('articles/article',fetchedArticle);
  } else{
    res.status(404).send('Article not found!');
  }
});

// add a new article
router.post('/', payload.articleReqCheck, (req, res) => {
  if(res.inputError.errorMessage.length === 0) { 
    articles.add(req.body);
    res.redirect('/articles');
  } else {
    res.status(400).send(res.inputError.errorMessage);
  }
});

// edit a specific article
router.put('/:id', payload.articleReqCheck, (req, res) => {
  if(res.inputError.errorMessage.length === 0) { 
    let editCheck = articles.edit(req.body); // attempt to edit articles

    if(editCheck) {
      res.redirect(`/articles/${req.body.urlTitle}`);
    } else {
      res.status(404).send('Article not found!');
    }
  } else {
    res.status(400).send(res.inputError.errorMessage);
  }
});

// deletes specific product
router.delete('/:id', (req, res) => {
  const title = req.params.id;
  const removeCheck = articles.remove(title);

  if(removeCheck) {
    res.redirect('/articles');
  } else {
    res.status(404).send('Article not found!');
  }
});

module.exports = router;