function validateProduct(res) {
  let nameCheck = (res.body.name && typeof res.body.name === "string");
  let priceCheck = (res.body.price && parseFloat(res.body.price) !== NaN);
  let inventoryCheck = (res.body.inventory && parseFloat(res.body.inventory) !== NaN);

  if(!nameCheck) {

  }

}


module.exports = {
  validateProduct: validateProduct 
}