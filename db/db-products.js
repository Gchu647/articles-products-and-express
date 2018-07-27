const collection = [];

function generateID() {
  return Math.floor((Math.random() * 100) + 1); 
}

// Works with GET /product
function all() {
  return collection;
}

// works with POST /product
function add (obj) {
  product = {};
  product.id = generateID();
  product.name = obj.name;
  product.price = parseFloat(obj.price);
  product.inventory = parseFloat(obj.inventory);

  collection.push(product);
}

// works with GET /product/id
function fetchByIndex(index) {
  return collection[index];
}

module.exports = {
  all: all,
  add: add,
  fetchByIndex: fetchByIndex
  // edit: edit
  // getByTitle: _getByTitle,
  // editByTitle: _editByTitle
};