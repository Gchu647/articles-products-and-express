const collection = ['Avocado'];

function all() {
  return collection;
}

function add (obj) {
  product = {};
  product.id = generateID();
  product.name = obj.name;
  product.price = parseFloat(obj.price);
  product.inventory = parseFloat(obj.inventory);

  collection.push(product);
}

function generateID() {
  return Math.floor((Math.random() * 1000) + 100); 
}

module.exports = {
  all: all,
  add: add,
  // getByTitle: _getByTitle,
  // editByTitle: _editByTitle
};