const express = require('express');
const { engine } = require(`express-handlebars`);
const path = require(`path`);
const app = express();
const port = 3000;

app.use(express.static(`public`))
app.engine('hbs', engine({ extname: '.hbs' }))
app.set(`view engine`, `hbs`);

// Routes
app.get(`/`, (req, res) => {
    res.render(`home`);
});
app.get(`/about`, (req, res) => {
    res.render(`about`);
});
app.get(`/addMovie`, (req, res) => {
    res.render(`newMovie`);
});
app.get(`/details`, (req, res) => {
    res.render(`details`);
});
app.get(`/search`, (req, res) => {
    res.render(`search`);
});
app.get(`/*`, (req, res) => {
    res.render(`404`);
});

app.listen(port, console.log(`App runs on:\nhttp://localhost:${port}`));