const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../../models/tourModel');
dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
const importData = async () => {
  try {
    const tourDoc = await Tour.create(tours);
    console.log('Data successfully loaded ,created rows' + tourDoc.length);
  } catch (err) {
    console.log(err);
  }
};

const deleteDataFromDb = async () => {
  try {
    const res = await Tour.deleteMany();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  console.log('Connection established');
  // console.log(con);
});
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteDataFromDb();
}
console.log(process.argv);