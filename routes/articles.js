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

// fetches a article based on the title
router.get('/:id', (req, res) => {
  const title = req.params.id;
  const fetchedArticle = articles.fetchByTitle(title);
  console.log('get ', title);

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

module.exports = router;