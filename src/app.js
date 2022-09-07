const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());


// register routes
app.use(routes);

// middlewares
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;