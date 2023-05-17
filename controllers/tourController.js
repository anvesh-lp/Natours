const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, val) => {
  /*  console.log("In check id tour middleware")
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: 'Invalid Id'
        });
    }*/
  next();
};

exports.checkBody = (req, res, next) => {
  console.log('In tour post middleware');
  if (!req.body.name || !req.body.ratingsAverage || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'cannot post the tour without data'
    });
  }
  next();
};

/*exports.postTour = (req, res) => {
    console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        console.log(err);
        if (err) res.status(401).send("Cannot add the data")
        res.status(201).send({
            status: "success",
            data: {
                tour: newTour
            }
        })
    });
}*/

exports.createTour = async (req, res) => {
  try {
    const savedTourDoc = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: savedTourDoc
      }
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};


/*exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find(tr => tr.id === id);
  if (!tour) {
    return res.status(401).json({
      status: 'erros',
      message: 'invalid'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};*/
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: {
        err
      }
    });
  }
};
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: {
        err
      }
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'Success',
      data: {
        updatedTour
      }
    });

  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: {
        err
      }
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'Success',
      data: {
        updatedTour
      }
    });

  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: {
        err
      }
    });
  }
};