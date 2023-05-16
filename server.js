const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const port = 3000;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  console.log('Connection established');
  // console.log(con);
});

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

const Tour = mongoose.model('Tour', tourSchema);
const newTour = new Tour({
  name: 'Tour 8',
  price: 100,
  rating: 4.5
});

newTour.save()
  .then((savedTour) => console.log(savedTour))
  .catch(err => console.log(err));
app.listen(port, () => {
  console.log(`app running on port ${port}.....`);
});
