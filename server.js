const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const PORT = process.env.PORT || 8060;

/*
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
*/

app.post('/products', (req, res) => {
  // call up the products.js
  // Inside the product.js it will use an add method and put the product object into collections in database
});

app.get('/products', (req, res) => {
  // This will for now return a collection of products
});



app.listen(PORT, () => {
  console.log(` Server running on ${PORT}`);
});