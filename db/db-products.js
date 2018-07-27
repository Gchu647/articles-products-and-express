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
  return Math.floor((Math.random() * 100) + 1); 
}

// WORK ON THIS!
// This function is running but I can't run this
function location(idCheck) {
  collection.forEach((element, index) => {
    if(element.id && element.id === idCheck) {
      console.log(index);
    }
  });
}

module.exports = {
  all: all,
  add: add,
  location: location
  // getByTitle: _getByTitle,
  // editByTitle: _editByTitle
};