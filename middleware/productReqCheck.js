productReqCheck = function(req, res, next) {
  console.log("Product Check: ", req.method);

  const idCheck = (req.body.id && !isNaN(req.body.id));
  const nameCheck = (req.body.name && typeof req.body.name === 'string');
  const priceCheck = (req.body.price && !isNaN(req.body.price));
  const inventoryCheck = (req.body.inventory && !isNaN(req.body.inventory));

  if(req.method === 'POST' && idCheck) {
    res.status(400).send('Ids are automatically generated');
  } else if (req.method === 'PUT' && !idCheck) {
    res.status(400).send('Needs proper id key and value');
  } else if(!nameCheck) {
    res.status(400).send('Needs proper name key and value');
  } else if(!priceCheck) {
    res.status(400).send('Needs proper price key and value');
  } else if (!inventoryCheck) {
    res.status(400).send('Needs proper inventory key and value');
  } else {
    next();
  }
}

module.exports = productReqCheck;