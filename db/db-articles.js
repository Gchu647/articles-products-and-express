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
  collection.push(article);
}

// WORKING ON THIS
function edit (obj) {
  const matchIndex = collection.findIndex(element => {
    return element.title === obj.title;
  });

  if(matchIndex === -1) {
    return false;
  } else {
    collection[matchIndex].title = obj.title;
    collection[matchIndex].body = obj.body;
    collection[matchIndex].author = obj.author;
    collecion[matchIndex].urlTitle = obj.title.split(' ').join('%20');
    
    return true; 
  }
}

module.exports = {
  all: all,
  add: add,
  fetchByTitle: fetchByTitle
};