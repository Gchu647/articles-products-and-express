const collection = [];
let currentID = 0;

function generateID() {
  return currentID += 1; 
}

// works with GET /product
function all() {
  return collection;
}

// fetches a product by its id
function fetchById(id) {
  const matchIndex = collection.findIndex(element => {
    return Number(element.id) === Number(id);
  });

  if(matchIndex === -1) {
    return null;
  } else {
    return collection[matchIndex];
  }
}

// works with POST /product
function add (obj) {
  product = {};
  product.id = generateID();
  product.name = obj.name;
  product.price = parseFloat(obj.price).toFixed(2);
  product.inventory = parseFloat(obj.inventory).toFixed(0);

  collection.push(product);
}

// Works with PUT to change the properties of a product id
function edit (obj) {
  const matchIndex = collection.findIndex(element => {
    return Number(element.id) === Number(obj.id);
  });

  if(matchIndex === -1) {
    return false;
  } else {
    collection[matchIndex].name = obj.name;
    collection[matchIndex].price = parseFloat(obj.price).toFixed(2);
    collection[matchIndex].inventory = parseFloat(obj.inventory).toFixed(0);
    
    return true; 
  }
}

function remove (id) {
  const matchIndex = collection.findIndex(element => {
    return Number(element.id) === Number(id);
  });

  console.log('match index: ', matchIndex);

  if(matchIndex === -1) {
    return false;
  } else {
    collection.splice(matchIndex, 1);
    return true;
  }
}

module.exports = {
  all: all,
  add: add,
  fetchById: fetchById,
  edit: edit,
  remove: remove
};