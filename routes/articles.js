const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const methodOveride = require('method-override');
const articles = require('../db/db-articles');

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

// add VALIDATION check
router.post('/', (req, res) => {
  articles.add(req.body);
  res.redirect('/articles');
});

// add VALIDATION check
router.put('/:id', (req, res) => {
  let editCheck = articles.edit(req.body); // attempt to edit articles

  if(editCheck) {
    res.redirect(`/articles/${req.body.urlTitle}`);
  } else {
    res.status(404).send('Article not found!');
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

// working on this
function articleReqCheck(req, res, next) {
  const titleCheck = (req.body.title && typeof req.body.title === 'string');
  const bodyCheck = (req.body.body && typeof req.body.body === 'string');
  const authorCheck = (req.body.author && typeof req.body.author === 'string');

  if(!titleCheck) {
    res.inputError.errorMessage += ' • Needs proper title key and value \r\n';
  } 
  
  if(!bodyCheck) {
    res.inputError.errorMessage += ' • Needs proper body key and value \r\n';
  }  
  
  if (!authorCheck) {
    res.inputError.errorMessage += ' • Needs proper author key and value \r\n';
  }
}

module.exports = router;