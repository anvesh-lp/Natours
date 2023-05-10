const express = require("express")
const app = express();
const fs = require('fs');
const {json} = require("express");
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get(`/api/v1/tours`, (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours: tours
        }
    })
});

app.post('/api/v1/tours', (req, res) => {
    console.log(req.body);
    const  newId=tours[tours.length-1].id+1;
    const newTour=Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        console.log(err);
        if (err) res.status(401).send("Cannot add the data")
        res.status(201).send({
            status:"success",
            data:{
                tour:newTour
            }
        })
    })
})


const port = 3000
app.listen(port, () => {
    console.log(`app running on port ${port}.....`)
});

