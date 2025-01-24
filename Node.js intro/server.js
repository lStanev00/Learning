const http = require(`http`);
const fs = require(`fs`);
const port = 3000;

http.createServer((req, res) => {
    switch (req.url) {
         //Site Routing
        case `/styles/site.css` :
            res.writeHead(200, {"content-type": `text/css`});
            res.end(fs.readFileSync(`./content/styles/site.css`, `utf8`));
            break;
        case `/images/pawprint.ico`:
            res.writeHead(200, {"content-type": `image/x-icon`});
            res.end(fs.readFileSync(`./content/images/pawprint.ico`));
            break;
        case `/cats/add-breed`: 
            res.writeHead(200, {"content-type": `text/html`});
            res.end(fs.readFileSync(`./views/addBreed.html`, `utf8`));
            break;
        case `/cats/add-cat`: 
            res.writeHead(200, {"content-type": `text/html`});
            res.end(fs.readFileSync(`./views/addCat.html`, `utf8`));
            break;
        case `/`:
            res.writeHead(200, {"content-type": `text/html`});
            res.end(fs.readFileSync(`./views/home/index.html`, `utf8`));
            break;
        // Handling data serving/posting (mongoDB still not introduced)
        case `/data/breeds` :
            const breeds = fs.readFileSync(`./data/breeds.json`, `utf-8`);
            if(req.method === `GET`) {
                res.writeHead(200, {"content-type": "application/json"})
                res.end(breeds);
                // res.end()
                break;
            } else if (req.method === `POST`) {
                let body = ``;

                req.on(`data`, chunk => {
                    body += chunk;
                    body = JSON.parse(body);
                });

                req.on(`end`, () => {
                    const catsData = (JSON.stringify(body, null, 2));
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify("The breed is sccessfully added!"));

                    //Store the data
                    fs.writeFileSync(`./data/breeds.json`, catsData, `utf8`);
                });

                req.on('error', (err) => {
                    console.error('Error:', err.message);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                });
                break;
            }
        case `/data/cats`:
            const cats = fs.readFileSync(`./data/cats.json`, `utf-8`);
            if (req.method === `GET`) {
                res.writeHead(200, {"content-type": "application/json"});
                res.end(cats);
                break;
            } else if(req.method === `POST`) {
                let body = ``;

                req.on(`data`, chunk => {
                    body += chunk;
                });
                
                req.on(`end`, () => {
                    body = JSON.parse(body);
                    const catsData = body;
                    const JSONcatsData = JSON.stringify({//Prepare to store the JSON data
                        name : catsData.name,
                        description : catsData.description,
                        imgFileName : catsData.imgFileName,
                        breed : catsData.breed,
                    })
                    const imgFile = Buffer.from(catsData.imgFile, `base64`);//Decode the base64 image
                    
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify("The cat was successfully added!"));
                    
                    //Store the data
                    fs.writeFileSync(`./data/Pictures/${catsData.imgFileName}`, imgFile);
                    fs.writeFileSync(`./data/cats.json`, JSONcatsData, `utf8`);
                });

                req.on('error', (err) => {
                    console.error('Error:', err.message);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                });
                break;
            }
        //Serving the javaScript(front end) 
        case `/handlers/addBreed`:
            res.writeHead(200, {"content-type": "application/javascript"});
            res.end(fs.readFileSync(`./handlers/addBreed.js`));
            break;
        case `/handlers/addCat`:
            res.writeHead(200, {"content-type": "application/javascript"});
            res.end(fs.readFileSync(`./handlers/addCat.js`));
            break;
        }
}).listen(port);