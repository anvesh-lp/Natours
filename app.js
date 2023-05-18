const express = require('express');
const app = express();
const fs = require('fs');
const { json } = require('express');
const AppError = require('./utils/AppError');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
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
  next(new AppError(`cant find ${req.url} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;


