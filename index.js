const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const listRoutes = require('./routes/lists');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./model/user');

const hostname = 'localhost';
const port = 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(session())
app.use(passport.initialize());
// passport.session allows login to persist across pages
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

const sessionOptions = {secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false}
app.use(session(sessionOptions));

app.use('/', listRoutes);

app.use(express.static("public"));
app.use(express.static("node_modules"));

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count +=1;
    } else {
        req.session.count = 1;
    }
    res.send(`you have viewed this page ${req.session.count} times`)
})

app.get('/register', (req,res) => {
    const { username = 'Anonymous' } = req.query;
    req.session.username = username;
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`welcome back, ${username}`)
})

app.get('/add', (req,res) => {
    res.render("add")
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
