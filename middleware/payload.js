module.exports = {
  productReqCheck: productReqCheck,
  articleReqCheck: articleReqCheck
}

// function for checking product requests for PUT and POST
function productReqCheck(req, res, next) {
  const idCheck = (req.body.id && !isNaN(req.body.id));
  const nameCheck = (req.body.name && typeof req.body.name === 'string');
  const priceCheck = (req.body.price && !isNaN(req.body.price));
  const inventoryCheck = (req.body.inventory && !isNaN(req.body.inventory));

  res.inputError = {'message': '', 'showContent': false};

  if(req.method === 'POST' && idCheck) {
    res.inputError.message += 'Ids are automatically generated  |  ';
  }
  
  if (req.method === 'PUT' && !idCheck) {
    res.inputError.message += 'Needs proper id key and value  |  ';
  }
  
  if(!nameCheck) {
    res.inputError.message += 'Needs proper name key and value  |  ';
  } 
  
  if(!priceCheck) {
    res.inputError.message += 'Needs proper price key and value  |  ';
  }  
  
  if (!inventoryCheck) {
    res.inputError.message += 'Needs proper invetory key and value  |  ';
  }

  next();
}

// function for checking article request
function articleReqCheck(req, res, next) {
  const titleCheck = (req.body.title && typeof req.body.title === 'string');
  const bodyCheck = (req.body.body && typeof req.body.body === 'string');
  const authorCheck = (req.body.author && typeof req.body.author === 'string');

  res.inputError = {'message': '', 'showContent': false};

  if(!titleCheck) {
    res.inputError.message += 'Needs proper title key and value  |  ';
  } 
  
  if(!bodyCheck) {
    res.inputError.message += 'Needs proper body key and value  |  ';
  }  
  
  if (!authorCheck) {
    res.inputError.message += 'Needs proper author key and value  |  ';
  }

  next();
}