import express from "express";
import { engine } from "express-handlebars";
import routes from "./router.js";
import { starRating } from "./Helpers/handlebars/starRateing.js";

const app = express();
const port = 3000;

app.use(express.static("src/public"));
app.engine("hbs", engine({ extname: ".hbs", helpers: {  starRating  } }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use(express.json()); // Parser for json incomming

// Router invoke
app.use("/", routes);

app.listen(port, () => console.log(`App runs on: http://localhost:${port}`));