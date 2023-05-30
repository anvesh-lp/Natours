const fs = require('fs');
const express = require('express');
const { json } = require('express');
const authController = require('./../controllers/authentication');

const {
  createTour,
  getTour,
  getTours,
  checkId,
  checkBody,
  deleteTour,
  updateTour,
  aliasTopTours,
  getTourStats

} = require('./../controllers/tourController');


const tourRouter = express.Router();
tourRouter
  .route('/top-5-cheap')
  .get(aliasTopTours, getTours);

tourRouter.route('/tour-stats').get(getTourStats);
tourRouter.param('id', checkId);
tourRouter.route('/').get(authController.protect,getTours).post(checkBody, createTour);
tourRouter.route(`/:id`).get(getTour).delete(deleteTour).patch(updateTour);
module.exports = tourRouter;