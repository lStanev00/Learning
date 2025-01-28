const link = `http://localhost:3000/`;
const catsJSON = await getReq(link + `data/cats`);
const ulEl = document.querySelector(`main > section > ul`);

for (const catInfo of catsJSON) {//Build the HTML (keep it as vanilla as possible i can manage it eazier)
    const liEl = document.createElement(`li`);
    liEl.id = catInfo.innerID

    const {  innerID,breed, description, imgFileName, name  } = catInfo;
    
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
            aEditEl.href = `/editCat/${innerID}`;
            aEditEl.textContent = `Change Info TODO`;
            liEditEl.append(aEditEl);

        const liDeleteEl = document.createElement(`li`);
        liDeleteEl.classList = `btn delete`

            const aDeleteEl = document.createElement(`a`);
            aDeleteEl.href = `/catShelter/${innerID}`;
            aDeleteEl.textContent = `New Home`;
            liDeleteEl.append(aDeleteEl);

        btnUlEl.append(liEditEl, liDeleteEl);

    liEl.append(imgEl, h3El, breedPEl, descPEl, btnUlEl);
    ulEl.append(liEl);//Append to DOM

}

const searchEl = document.querySelector("body > header > form");
const inputSearchEl = document.querySelector("body > header > form > input[type=text]")
const suggestionsList = document.querySelector("body > header > form > ul")
const searchBtn = document.querySelector("body > header > form > button");
const searchArray = [];

for (const {    innerID ,breed, description, imgFileName, name   } of catsJSON) {
    searchArray.push([name, Number(innerID)]); //Build the search values
}

searchEl.addEventListener(`submit`, (e) => {e.preventDefault();}); // Prevent default behavior

inputSearchEl.addEventListener(`input`, searchUlRender);
inputSearchEl.addEventListener(`focus`, searchUlRender);

inputSearchEl.addEventListener('blur', () => {
    setTimeout(() => {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
    }, 150); // Small delay to allow click handling
});

searchBtn.addEventListener(`click`, (e) => {//Button click trigger the search
    const searchID = inputSearchEl.id;
    inputSearchEl.value = ``;
    inputSearchEl.id = ``;

    const srEl = document.getElementById(searchID);    
    if (srEl) {
        const originalStyles = {
            backgroundColor: srEl.style.backgroundColor,
            color: srEl.style.color,
            transition: srEl.style.transition,
            border: srEl.style.border
        };
        
        srEl.scrollIntoView({ behavior: "smooth", block: "center" });
        srEl.style.backgroundColor = '#d9e6f2';
        srEl.style.color = '#1c1c2e';
        srEl.style.border = '2px solid lightskyblue';
        srEl.style.transition = 'background-color 0.4s ease, color 0.4s ease, border 0.4s ease';
    
        setTimeout(() => {
            srEl.style.backgroundColor = originalStyles.backgroundColor || '';
            srEl.style.color = originalStyles.color || '';
            srEl.style.border = originalStyles.border || '';
            srEl.style.transition = originalStyles.transition || '';
        }, 3000);
    }
    
});

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

function searchUlRender(e){//Render the "intelisense" dropdown menu
    const searchString = (e.target.value).toLowerCase().trim();
    suggestionsList.innerHTML = ``;
    suggestionsList.style.display = searchString == `` ? `none` : `block`;

    if (searchString === ``) return
    let tab = -1;
    for (const [name, innerID] of searchArray) {
        if(((name).toLowerCase().trim()).includes(searchString)) {
            tab += 1;
            const suggestionItemLi = document.createElement(`li`);
            suggestionItemLi.classList = `suggestion-item`;

            suggestionItemLi.id = innerID;
            suggestionItemLi.tabIndex = tab;
            suggestionItemLi.textContent = name;

            suggestionsList.append(suggestionItemLi);

            suggestionItemLi.addEventListener(`click`, (e) => {
                inputSearchEl.value = name;
                inputSearchEl.id = innerID;
                suggestionsList.innerHTML = ''; 
                suggestionsList.style.display = 'none'; 
                searchBtn.click(); //Trigger the search
            })
        }
    }
}
let focusIndex = -1;

function handleKeyPress(e) {// Handle keystrokes for the ul navigation
    const trigEl = document.querySelectorAll(".suggestions > li");

    if (!trigEl) return;
    let element
    const listLength = trigEl.length - 1;

    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            if (focusIndex != 0) focusIndex--;
            element = suggestionsList.querySelector(`[tabindex="${focusIndex}"]`);
            element.focus();
            inputSearchEl.value = (element.textContent).trim();
            break;
        case 'ArrowDown':
            e.preventDefault();
            if (focusIndex >= listLength) break;
            focusIndex++;
            element = suggestionsList.querySelector(`[tabindex="${focusIndex}"]`);
            inputSearchEl.value = (element.textContent).trim();
            element.focus();
            break;
        case 'Enter':
            e.preventDefault();
            element = suggestionsList.querySelector(`[tabindex="${focusIndex}"]`);
            if (!element) {
                focusIndex--;
                element = suggestionsList.querySelector(`[tabindex="${focusIndex}"]`);
            }
            element.click();
            setTimeout(() => {searchBtn.click()}, 5)
            focusIndex = 0
            break;
        default : break;
    }
}

document.addEventListener('keydown', handleKeyPress);