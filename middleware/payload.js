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

  res.inputError = {'errorMessage': ''};

  if(req.method === 'POST' && idCheck) {
    res.inputError.errorMessage += ' • Ids are automatically generated \r\n';
  }
  
  if (req.method === 'PUT' && !idCheck) {
    res.inputError.errorMessage += ' • Needs proper id key and value \r\n';
  }
  
  if(!nameCheck) {
    res.inputError.errorMessage += ' • Needs proper name key and value \r\n';
  } 
  
  if(!priceCheck) {
    res.inputError.errorMessage += ' • Needs proper price key and value \r\n';
  }  
  
  if (!inventoryCheck) {
    res.inputError.errorMessage += ' • Needs proper invetory key and value \r\n';
  }

  next();
}

// function for checking article request
function articleReqCheck(req, res, next) {
  const titleCheck = (req.body.title && typeof req.body.title === 'string');
  const bodyCheck = (req.body.body && typeof req.body.body === 'string');
  const authorCheck = (req.body.author && typeof req.body.author === 'string');

  res.inputError = {'errorMessage': ''};

  if(!titleCheck) {
    res.inputError.errorMessage += ' • Needs proper title key and value \r\n';
  } 
  
  if(!bodyCheck) {
    res.inputError.errorMessage += ' • Needs proper body key and value \r\n';
  }  
  
  if (!authorCheck) {
    res.inputError.errorMessage += ' • Needs proper author key and value \r\n';
  }

  next();
}