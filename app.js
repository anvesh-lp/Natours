const express = require("express")
const app = express();
const fs = require('fs');
const {json} = require("express");

const morgan = require("morgan");
const tourRouter = require('./routes/tourRouter')
const userRouter = require('./routes/userRouter')

app.use(express.json());
app.use(morgan('dev'))


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


const port = 3000
app.listen(port, () => {
    console.log(`app running on port ${port}.....`)
});

