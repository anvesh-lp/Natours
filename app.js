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
    res.send("Done");
})


const port = 3000
app.listen(port, () => {
    console.log(`app running on port ${port}.....`)
});

