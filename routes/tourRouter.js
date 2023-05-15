const fs = require('fs');
const express = require("express")
const {json} = require("express");
const {postTour, getTour, getTours, checkId, checkBody} = require('./../controllers/tourController')

const tourRouter = express.Router();
tourRouter.param('id', checkId)
tourRouter.route('/').get(getTours).post(checkBody, postTour)
tourRouter.route(`/:id`).get(getTour);
module.exports = tourRouter