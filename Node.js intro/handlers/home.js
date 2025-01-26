const link = `http://localhost:3000/`;
const catsJSON = await getReq(link + `data/cats`);
const ulEl = document.querySelector(`main > section > ul`);

for (const catInfo of catsJSON) {//Build the HTML (keep it as vanilla as possible i can manage it eazier)
    const liEl = document.createElement(`li`);

    const {  breed, description, imgFileName, name  } = catInfo;
    
    //Create the img
    const imgEl = document.createElement(`img`);
    imgEl.src = `${link}data/Pictures/${imgFileName}`;
    imgEl.alt = name;

    //Create the h3 name holder element
    const h3El = document.createElement(`h3`);
    h3El.textContent = name;

    //Create the Breed info p > span
    const breedPEl = document.createElement(`p`);
    const breedSpanEl = document.createElement(`span`);

    breedSpanEl.textContent = `Breed: `;
    breedPEl.append(breedSpanEl);

    breedPEl.append(document.createTextNode(breed));

    //Create the Description info p > span
    const descPEl = document.createElement(`p`);
    const descSpanEl = document.createElement(`span`);

    descSpanEl.textContent = `Description: `;
    descPEl.append(descSpanEl);

    descPEl.append(document.createTextNode(description));

    //Create the ul > 2li > a(buttons like)
    const btnUlEl = document.createElement(`ul`);
    btnUlEl.classList = `buttons`;

        const liEditEl = document.createElement(`li`);
        liEditEl.classList = `btn edit`;
        
            const aEditEl = document.createElement(`a`);
            aEditEl.href = `TODO`;
            aEditEl.textContent = `Change Info TODO`;
            liEditEl.append(aEditEl);

        const liDeleteEl = document.createElement(`li`);
        liDeleteEl.classList = `btn delete`

            const aDeleteEl = document.createElement(`a`);
            aDeleteEl.href = `/catShelter/${name}`;
            aDeleteEl.textContent = `New Home`;
            liDeleteEl.append(aDeleteEl);

        btnUlEl.append(liEditEl, liDeleteEl);

    liEl.append(imgEl, h3El, breedPEl, descPEl, btnUlEl);
    ulEl.append(liEl);//Append to DOM

}


async function getReq(URL) { //Helper for requests
    return await(await fetch(URL)).json();
}

async function deleteReq(catInfo) {
    const req = await fetch(link + `data/cats`, {
        method: `DELETE`,
        headers: {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(catInfo),
    });

    return await req.json()
}