const collection = [{title: 'Make Your Bed', body: '......', author: 'William H. McRaven '}];

function all() {
  return collection;
}

function add (obj) {
  article = {};
  article.title = obj.title;
  article.body = obj.body;
  article.author = obj.author;
  article.urlTitle = obj.title.split(' ').join('%');
  collection.push(article);
}

module.exports = {
  all: all,
  add: add
  // getByTitle: _getByTitle,
  // editByTitle: _editByTitle
};