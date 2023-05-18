const fs = require('fs');
const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/APIFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};


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

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStarts: -1 }
      },
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};