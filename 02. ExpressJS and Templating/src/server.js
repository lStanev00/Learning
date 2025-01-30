const express = require('express');
const { engine } = require(`express-handlebars`);
const path = require(`path`);
const routes = require(`./router.js`)
const app = express();
const port = 3000;

app.use(express.static(`public`))
app.engine('hbs', engine({ extname: '.hbs' }))
app.set(`view engine`, `hbs`);

// Router invoke
app.use(`/`, routes);


app.listen(port, console.log(`App runs on:\nhttp://localhost:${port}`));