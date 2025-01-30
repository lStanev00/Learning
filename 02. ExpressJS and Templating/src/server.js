const express = require('express');
const { engine } = require(`express-handlebars`);
const path = require(`path`);
const routes = require(`./router.js`)
const app = express();
const port = 3000;

app.use(express.static(`src/public`))
app.engine('hbs', engine({ extname: '.hbs' }))
app.set(`view engine`, `hbs`);
app.set(`views`, `./src/views`)

// Router invoke
app.use(`/`, routes);


app.listen(port, console.log(`App runs on:\nhttp://localhost:${port}`));