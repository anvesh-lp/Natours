const express = require('express');
const app = express();
const fs = require('fs');
const { json } = require('express');

const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  /*res.status(404).json({
    status: 'fail',
    message: `cant find ${req.url}`
  });*/

  const err = new Error(`cant find ${req.url} on this server`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});


app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;


