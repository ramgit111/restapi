const express = require('express');
const proControl = require('../controller');
const appRoute = express.Router();

appRoute.route('/').get(proControl.home);
appRoute.route('/').post(proControl.newProduct);         //Create a New Product  
appRoute.route('/:id').get(proControl.editProduct);      //Read Single Data
appRoute.route('/:id').patch(proControl.updateProduct);  //Update single product
appRoute.route('/:id').delete(proControl.deleteProduct); //Delete product

module.exports = appRoute;
