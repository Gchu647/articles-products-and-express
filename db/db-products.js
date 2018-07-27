const collection = [];

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
  return Math.floor((Math.random() * 100) + 1); 
}

// Edit information coming in
function edit() {

}

module.exports = {
  all: all,
  add: add,
  // edit: edit
  // getByTitle: _getByTitle,
  // editByTitle: _editByTitle
};