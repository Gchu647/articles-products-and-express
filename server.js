const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const products = require('./routes/products.js');
const PORT = process.env.PORT || 8060;

// Use the products
app.use('/products',products); 

app.listen(PORT, () => {
  console.log(` Server running on ${PORT}`);
});