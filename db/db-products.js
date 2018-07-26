const collection = ['Avocado'];

function all() {
  return collection;
}

function add (product) {
  collection.push(product);
}

module.exports = {
  all: all,
  add: add,
  // getByTitle: _getByTitle,
  // editByTitle: _editByTitle
};