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

// the page to edit your articles
router.get('/:article_id/edit', (req, res) => {
  res.render('articles/edit', req.body);
})

// returns an article matching the id
router.get('/:article_title', (req, res) => {
  const title = req.params.article_title;

  knex('articles').where('title', title).first()
    .then(fetchedarticle => {
      if(!fetchedarticle) {
        throw Error('article not Found!');
      }

      res.render('articles/article', fetchedarticle);
    })
    .catch(err => res.status(404).render('404',{'message': err.message}));
});

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

    knex('articles').insert(article)
    .then(() => {
      res.redirect('/articles');
    })
    .catch(err => res.status(404).render('404',{'message': err.message}));
  }
});

// edit an article by its title
router.put('/:article_id', payload.articleReqCheck, (req, res) => {
  if(res.inputError.message.length > 0) { // initial error check
    res.status(400).send(res.inputError.message); // redirect page in the works
  } else {
    const title = req.body.title;
    const newUrlTitle = title.split(' ').join('%20')
    console.log('Updating the article: ', req.body.title);
    const article = {
      'title': req.body.title,
      'body': req.body.body,
      'author': req.body.author,
      'urltitle': req.body.urltitle,
      'updated_at': knex.fn.now()
    };

    knex('articles').update(article).where('urltitle', req.body.urltitle) // update doesn't return anything
    .then(() => {
      res.redirect(`/articles/${newUrlTitle}`);
    })
    .catch(err => {
      console.log(err);
      // res.status(404).render('404',{'message': err.message})
    }); 
  }
});

// delete article by id
router.delete('/:article_title', (req, res) => {
  const title = req.params.article_title;

  knex('articles').where('title', title).del()
    .then(removed => {
      if(!removed) {
        throw Error('article does not exist');
      }

      res.redirect('/articles');
    })
    .catch(err => res.status(404).render('404',{'message': err.message}));
});

module.exports = router;