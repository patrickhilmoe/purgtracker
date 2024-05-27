const express = require('express');
const path = require('path')

const hostname = 'localhost';
const port = 3000;

const app = express();

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
// app.use(express.bodyParser());
// app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res) => {
//     console.log(req.headers);
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<html><body><h1>This is an Express Server</h1></body></html>');
// });

app.get('/', (req,res) => {
    res.render('index')
    // res.end('<html><body><h1>This is an Express Server</h1></body></html>');
})

app.get('/message', (req,res) => {
    res.render('index')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
