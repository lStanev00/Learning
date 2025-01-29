const express = require('express');
const { engine } = require(`express-handlebars`);
const path = require(`path`);
const app = express();
const port = 3000;

app.use(express.static(`public`))
app.engine('hbs', engine({ extname: '.hbs' }))
app.set(`view engine`, `hbs`);

app.get(`/`, (req, res) => {
    res.render(`home`);
})

app.listen(port, console.log(`App runs on:\nhttp://localhost:${port}`));