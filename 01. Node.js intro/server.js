const http = require(`http`);
const fs = require(`fs`);
const port = 3000;

const catShelter = require(`./views/catShelter.html.js`);

http.createServer(async (req, res) => {
    switch (req.url) {
         //Site Routing
        case `/styles/site.css` :
            res.writeHead(200, {"content-type": `text/css`});
            res.end(fs.readFileSync(`./content/styles/site.css`, `utf8`));
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
            let cats = fs.readFileSync(`./data/cats.json`, `utf-8`);
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
                    const JSONcatsData = {//Prepare to store the JSON data
                        innerID : catsData.innerID,
                        name : catsData.name,
                        description : catsData.description,
                        imgFileName : catsData.imgFileName,
                        breed : catsData.breed,
                    }
                    console.log();
                    
                    const imgFile = Buffer.from(catsData.imgFile, `base64`);//Decode the base64 image
                    cats = JSON.parse(cats);//To JavaScript obj
                    cats.push(JSONcatsData);//Update the info
                    cats = JSON.stringify(cats);//Stringify to JSON back to export
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify("The cat was successfully added!"));
                    
                    //Store the data
                    fs.writeFileSync(`./data/Pictures/${catsData.imgFileName}`, imgFile);
                    fs.writeFileSync(`./data/cats.json`, cats, `utf8`);
                });

                req.on('error', (err) => {
                    console.error('Error:', err.message);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                });
                break;
            } else if(req.method === `DELETE`) {
               let body = ``;
               
               req.on(`data`, chunk => {
                body += chunk;
               });
               req.on(`end`, () => {
                body = JSON.parse(body);
                cats = JSON.parse(cats);
                const deleteIndex = cats.indexOf(body);
                cats.splice(deleteIndex, 1);
                fs.writeFileSync(`./data/cats.json`, JSON.stringify(cats), `utf8`);
                fs.unlinkSync(`./data/Pictures/${body.imgFileName}`);
                res.writeHead(200, {
                    "content-type" : "text/plain"
                })
                res.end(JSON.stringify(`The cat jsut found a new home`));
               });
               break;
            } else if(req.method === `PATCH`) {
                let body = ``;
                cats = JSON.parse(cats)

                req.on(`data`, chunk => {
                    body += chunk;
                });

                req.on(`end`, () => {
                    const data = JSON.parse(body);
                    let updatedCat = {
                        innerID : data.innerID,
                        name : data.name,
                        description : data.description,
                    }
                    console.log(data.oldImgFileName + `\n` + data.imgFileName);
                    
                    if(data.oldImgFileName === data.imgFileName) {
                        updatedCat.imgFileName = data.oldImgFileName;
                    } else {
                        updatedCat.imgFileName = data.imgFileName;
                        const imgFile = Buffer.from(data.imgFile, `base64`)
                        fs.unlinkSync(`./data/Pictures/${data.oldImgFileName}`);
                        fs.writeFileSync(`./data/Pictures/${data.imgFileName}`, imgFile);
                    }
                    updatedCat.breed = data.breed;
                    const currentCatObjIndex = cats.findIndex(obj => obj["innerID"] == updatedCat.innerID);

                    if(currentCatObjIndex != -1){
                        cats[currentCatObjIndex] = updatedCat;
                        fs.writeFileSync(`./data/cats.json`, JSON.stringify(cats), `utf8`);
                    } else {
                        console.log(`error index : ${currentCatObjIndex}\nupdated cat: ${updatedCat}\n`);
                        
                    }
                    res.end();

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
        case `/handlers/home`:
            res.writeHead(200, {"content-type": "application/javascript"});
            res.end(fs.readFileSync(`./handlers/home.js`));
            break
        case `/handlers/editCat`:
            res.writeHead(200, {"content-type": "application/javascript"});
            res.end(fs.readFileSync(`./handlers/editCat.js`));
            break

        //Default behavior
        default:
            //Handle the pictures serving
            if (req.url.includes(`/data/Pictures`)){
                const requestedPicture = decodeURIComponent(req.url.replace(`/data/Pictures/`, ``));
                const [ name, extension ] = requestedPicture.split(`.`);
                res.writeHead(200, {
                    "content-type" : `image/${extension}`,
                    "cache-control" : `no-cache, no-store, must-revalidate`,
                    "Content-Disposition": `inline; filename="${requestedPicture}"`
                });
                
                fs.createReadStream(`./data/Pictures/${requestedPicture}`).pipe(res);
                break;
             } else if(req.url.includes(`/catShelter`)){
                const currentCatID = decodeURIComponent(req.url.replace(`/catShelter/`, ``));
                const catsDB = JSON.parse(fs.readFileSync(`./data/cats.json`, `utf8`));
                const catObj = catsDB.find(obj => obj["innerID"] == currentCatID);
                
                res.writeHead(200, {
                    "content-type": "text/html"
                });
                res.end(catShelter(catObj.innerID, catObj.breed, catObj.description, catObj.imgFileName, catObj.name));
                break;
            } else if(req.url.includes(`/editCat`)) {
                res.writeHead(200, {"content-type": `text/html`});
                res.end(fs.readFileSync(`./views/editCat.html`, `utf8`));
                break;
            }
            break;
        }

}).listen(port, () => {
    console.log(`Server running at : http://localhost:${port}/`);    
});