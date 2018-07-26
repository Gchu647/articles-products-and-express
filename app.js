const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const PORT = process.env.PORT || 8060;

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  const locals = {
    title: 'devleague',
    greetings: 'Aloha',
    showContent: true,
    collection: [
      'puffins',
      'penguins',
      'pidgeons'
    ]
  };
  res.render('home', locals);
});



app.listen(PORT, () => {
  console.log(` Server running on ${PORT}`);
});