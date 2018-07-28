const collection = [];
let currentID = 0;

function generateID() {
  return currentID += 1; 
}

// Works with GET /product
function all() {
  return collection;
}

/* works with GET /product/id
function fetchByIndex(index) {
  return collection[index];
}
*/

function fetch() {
  // Working on new fetch index
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

function edit (obj) {
  const matchIndex = collection.findIndex(element => {
    return Number(element.id) === Number(obj.id);
  });

  if(matchIndex === -1) {
    return false;
  } else {
    collection[matchIndex].name = obj.name;
    collection[matchIndex].price = parseFloat(obj.price);
    collection[matchIndex].inventory = parseFloat(obj.inventory);
    
    return true; 
  }
}

module.exports = {
  all: all,
  add: add,
  fetchByIndex: fetchByIndex,
  edit: edit
  // getByTitle: _getByTitle,
  // editByTitle: _editByTitle
};