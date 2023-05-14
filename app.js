const express = require("express")
const app = express();
const fs = require('fs');
const {json} = require("express");
const morgan = require("morgan");
app.use(express.json());
app.use(morgan('dev'))
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
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
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

app.get(`/api/v1/tours/:id`, (req, res) => {
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

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Not yet defined"
    })
}
const getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Not yet defined"
    })
}
const updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Not yet defined"
    })
}
const deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Not yet defined"
    })
}
const createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Not yet defined"
    })
}

app.route('/api/v1/users').get(getAllUsers);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser).post(createUser);

const port = 3000
app.listen(port, () => {
    console.log(`app running on port ${port}.....`)
});

