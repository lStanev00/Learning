const formEl = document.querySelector(`form`);
const breedsData = await getBreedData(); //Import as type="module" in the HTML so we have a top lvl async
const breedEl = document.querySelector("#group");
(function optionConstructor(arr, el) { // Load the breeds in the breeds select falldown menu
    for (const breed of arr) { // Loop the breeds
        const optionEl = document.createElement(`option`);
        optionEl.value = breed;
        optionEl.textContent = breed;
        el.append(optionEl);// Append to the element(it's given when invoked)
    }
})(breedsData, breedEl);

formEl.addEventListener(`submit`, async (e) => {
    e.preventDefault();
    const link = `http://localhost:3000/data/cats`;
    
    //Data export preparation
    const formData = new FormData(e.target);
    const name = formData.get(`name`);
    const description = formData.get(`description`);
    const imgFile = await imageToBase64(formData.get(`upload`));
    const imgFileName = formData.get(`upload`).name;
    const breed = formData.get(`breed`);


    // Basic form validations
    if (name.length < 3) return
    if (description.length < 5) return
    if (!imgFile ) return
    if (!breed) return

    const cat = new Cat(await getId(), name, description, imgFile.replace(/^data:image\/[a-zA-Z]+;base64,/, ""), imgFileName, breed);
    console.log(cat);
    
    const request = await fetch(link, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(cat), 
    });

    const data = await request.json();

    formEl.reset();
    // window.location = `http://localhost:3000`;//Redirect to home
})

async function getBreedData() {
    const URL = `http://localhost:3000/data/breeds`; //URL for the request
    return await ((await fetch(URL)).json()) //Get the breeds data
}

class Cat { // Cat object Schema
    constructor(innerID, name, description, imgFile, imgFileName, breed) {
        this.innerID = innerID;
        this.name = name;
        this.description = description;
        this.imgFile = imgFile;
        this.imgFileName = imgFileName
        this.breed = breed; 
    };
}
async function imageToBase64(file) { //Encode the uploaded image file from the form to BASE64 so can be sent to the server
    return new Promise((resolve, reject) => {
        const encoder = new FileReader();
        encoder.onload = () => {
            resolve(encoder.result);
        };
        // No error handling /=> reject...

        encoder.readAsDataURL(file);
    });
}

async function getId() {
    const data = await(await fetch(`http://localhost:3000/data/cats`)).json();
    let lastestID = Number(data[data.length-1].innerID) + 1;
    console.log(lastestID);
    
    return Number(lastestID)
}
