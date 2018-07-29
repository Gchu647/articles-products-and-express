const collection = [];

function all() {
  return collection;
}

function fetchByTitle(title) {
  const matchIndex = collection.findIndex(element => {
    return element.title === title;
  });

  if(matchIndex === -1) {
    return null;
  } else {
    return collection[matchIndex];
  }
}

function add (obj) {
  article = {};
  article.title = obj.title;
  article.body = obj.body;
  article.author = obj.author;
  article.urlTitle = obj.title.split(' ').join('%20');
  console.log('Added ', article.urlTitle);
  collection.push(article);
}

module.exports = {
  all: all,
  add: add,
  fetchByTitle: fetchByTitle
};