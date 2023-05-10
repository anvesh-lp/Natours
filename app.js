const express = require("express")
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello from the server'})
});

app.post('/', (req, res) => {
    res.send('you can post to this url')
})
const port = 3000
app.listen(port, () => {
    console.log(`app running on port ${port}.....`)
});

