const express = require('express');
const app = express();
const path = require('path')

const hostname = 'localhost';
const port = 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const list = [
    {
        appliance: "LFXS98624S",
        qty: 1
    },
    {
        appliance: "TC5003WN",
        qty: 1
    },
    {
        appliance: "WDP5W",
        qty: 2
    },
    {
        appliance: "WRT318FZDM",
        qty: 1
    },
]

app.get('/list', (req,res) => {
    res.render('list', {list})
})

app.get('/add', (req,res) => {
    res.render("add")
})

app.post('/list', (req,res) => {
    const {appliance, qty} = req.body;
    list.push({appliance, qty})
    res.redirect('/list');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
