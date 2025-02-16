import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import router from "./src/router.js";
import { DBconnect } from "./src/helpers/mongoHelpers.js";

const app = express();
const port = 3000;

//Connect Database
await DBconnect()

// Handlebars setup
app.engine("hbs", engine({ extname: ".hbs"}));
app.set("view engine", "hbs");
app.set("views", "./src/views");

// Express setup
app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(router)

app.listen(port, console.log(`Server's running at http://localhost:${port}`)); 