const fs = require('fs');
const express = require("express")
const {json} = require("express");

const tourRouter = express.Router();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

tourRouter.get(`/`, (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours: tours
        }
    })
});

tourRouter.post('/', (req, res) => {
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
    })
})

tourRouter.get(`/:id`, (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(tr => tr.id === id);
    if (!tour) {
        return res.status(401).json({
            status: "erros",
            message: "invalid"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
});

module.exports=tourRouter