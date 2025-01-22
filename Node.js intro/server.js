const http = require(`http`);
const port = 3000;
const fs = require(`fs`);
const path = require(`path`);
const url = require(`url`);

//data
// const cats = require(`./data/cats.json`);
// const breeds = require(`./data/breeds.json`);

http.createServer((req, res) => {
    switch (req.url) {
        case `/styles/site.css` :
            res.writeHead(200, {"content-type": `text/css`});
            res.write(fs.readFileSync(`./content/styles/site.css`, `utf8`));
            break;
        case `/images/pawprint.ico`:
            res.writeHead(200, {"content-type": `image/x-icon`});
            res.write(fs.readFileSync(`./content/images/pawprint.ico`));
            break;
        case `/cats/add-breed`: 
            res.writeHead(200, {"content-type": `text/html`});
            res.write(fs.readFileSync(`./views/addBreed.html`, `utf8`));
            break;
        case `/cats/add-cat`: 
            res.writeHead(200, {"content-type": `text/html`});
            res.write(fs.readFileSync(`./views/addCat.html`, `utf8`));
            break;
        case `/`:
            res.writeHead(200, {"content-type": `text/html`});
            res.write(fs.readFileSync(`./views/home/index.html`, `utf8`));
            break;
        }
    res.end()
        
}).listen(port);