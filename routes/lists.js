const express = require('express');
const router = express.Router();

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

router.get('/', (req,res) => {
    res.render('list', {list})
})

router.post('/', (req,res) => {
    const {appliance, qty} = req.body;
    list.push({appliance, qty})
    res.redirect('/list');
})

module.exports = router;