const express = require('express');
const assert = require('assert');
//db connection object
const config = require('./config/Db');
// for handling post data from UI
const bodyParser = require('body-parser');
// db connectivity
const mongoose = require('mongoose');
// Cross Origin Resource Sharing => to avoid port block
const cors = require('cors');
const proRoute = require('./route');
// server port const
const PORT = Number(process.env.PORT || 3000);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Set the Global Promise for Mongoose DB
mongoose.Promise = global.Promise;

// view engine
// app.set('view engine', 'pug');
// app.set('views', './views');

//DB Connection
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  res => {
    console.log('Database successfully connected');
  },
  err => {
    assert.equal(null, err);
  }
);

//Setting the headers for HTTP Requests (Cross-Origin Resource Sharing)
//By default CORS will be blocked; hence, we have to explicitly enable it by the below
app.use(cors()); 

//Configure the Route
//http://localhost:3000/product/api
//app.use('/product/api');
app.use('/', proRoute);

//Configure the Port
app.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT}`);
});
