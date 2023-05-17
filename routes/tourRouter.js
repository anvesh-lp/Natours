const fs = require('fs');
const express = require('express');
const { json } = require('express');
const {
  createTour,
  getTour,
  getTours,
  checkId,
  checkBody,
  deleteTour,
  updateTour
} = require('./../controllers/tourController');

const tourRouter = express.Router();
tourRouter.param('id', checkId);
tourRouter.route('/').get(getTours).post(checkBody, createTour);
tourRouter.route(`/:id`).get(getTour).delete(deleteTour).patch(updateTour);
module.exports = tourRouter;