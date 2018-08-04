const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const methodOveride = require('method-override');
const products = require('./routes/products.js');
const articles = require('./routes/articles.js');
const PORT = process.env.PORT || 8060;

app.use(bodyParser.urlencoded({extended: true }));
app.use(methodOveride('_method'));

//Set handlebar
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

//--------- PRODUCTS & ARTICLES ROUTES-------------------------//

app.use('/products', products);
app.use('/articles', articles);

//--------------------------------------------------------------------//
app.get('*', (req, res) => {
  res.status(404).render('404',{
    'showNote': true,
    'note': 'Note: Wrong Route!'
  });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke on the server side');
});

app.listen(PORT, () => {
  console.log(` Server running on ${PORT}`);
});