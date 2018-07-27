const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const products = require('./routes/products.js');
const PORT = process.env.PORT || 8060;

// Use the products
app.use('/products',products);

//Handle bar testing
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/handletest', (req, res) => {
  res.render('home', {
    greetings: 'Aloha'
  });
});





//-------------------------------
app.get('*', (req, res) => {
  res.send('Didnt find route');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke on the server side');
});

app.listen(PORT, () => {
  console.log(` Server running on ${PORT}`);
});