const fs = require('fs');
const express = require("express")
const {json} = require("express");
const {postTour,getTour,getTours,checkId}=require('./../controllers/tourController')

const tourRouter = express.Router();
tourRouter.param('id',checkId)
tourRouter.post('/', postTour)
tourRouter.get(`/:id`, getTour);
tourRouter.get(`/`, getTours);
module.exports = tourRouter