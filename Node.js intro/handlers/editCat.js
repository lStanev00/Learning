const getCatsURL = "http://localhost:3000/data/cats";
let picFileStore;

const curentCatID = decodeURIComponent((window.location.href).replace("http://localhost:3000/editCat/", ``));
const allCats = await(await fetch(getCatsURL)).json();
const catObj = allCats.find(obj => obj["innerID"] == curentCatID);
const formEl = document.querySelector(`form`);

(async function domBuilder(catObj){
    const title = document.createElement(`h2`);
    title.textContent = `Edit Cat`;

    const nameLabel = document.createElement(`label`);
    nameLabel.setAttribute(`for`, `name`);
    nameLabel.textContent = `Name`;

    const nameInput = document.createElement(`input`);
    nameInput.type = `text`;
    nameInput.id = `name`;
    nameInput.value = catObj.name;
    nameInput.name = `name`

    const descLabel = document.createElement(`label`);
    descLabel.setAttribute(`for`, `description`);
    descLabel.textContent = `Description`;

    const descTextarea = document.createElement(`textarea`);
    descTextarea.id = `description`;
    descTextarea.textContent = catObj.description;
    descTextarea.name = `description`

    const imageLabel = document.createElement(`label`);
    imageLabel.setAttribute(`for`, `image`);
    imageLabel.textContent = `Image`;

    const imageInput = document.createElement(`input`);
    imageInput.type = `file`;
    imageInput.id = `image`;
    await assignAPicture(catObj.imgFileName, imageInput);
    imageInput.name = `upload`;

    const groupLabel = document.createElement(`label`);
    groupLabel.setAttribute(`for`, `group`);
    groupLabel.textContent = `Breed`;

    const groupSelect = document.createElement(`select`);
    groupSelect.id = `group`;
    groupSelect.name = `breed`;

    const groupOption = document.createElement(`option`);
    groupOption.value = catObj.breed;
    groupOption.textContent = catObj.breed;
    groupSelect.appendChild(groupOption);
    for (const BRD of await(await fetch("http://localhost:3000/data/breeds")).json()) {
        if (BRD === catObj.breed) continue;
        const newOption = document.createElement(`option`);
        newOption.value = BRD;
        newOption.textContent = BRD;
        groupSelect.appendChild(newOption);

    }

    const editButton = document.createElement(`button`);
    editButton.textContent = `Edit Cat`;

    // Append elements to container
    formEl.append(title, nameLabel, nameInput, descLabel, descTextarea, imageLabel, imageInput, groupLabel, groupSelect, editButton);
})(catObj);

formEl.addEventListener(`submit`, async (e) => {
    e.preventDefault();

    const formData = new FormData(formEl);
    const name = formData.get(`name`);
    const description = formData.get(`description`);
    const imgFile = await imageToBase64(formData.get(`upload`) instanceof Blob ? formData.get(`upload`) : picFileStore);
    const imgFileName = formData.get(`upload`).name != picFileStore.name ? formData.get(`upload`).name : picFileStore.name;
    const breed = formData.get(`breed`);

    if (name.length < 3) return
    if (description.length < 5) return
    if (!imgFile ) return
    if (!breed) return

    const updatedCat = Object.assign({}, new Cat(catObj.innerID, name, description, imgFile.replace(/^data:image\/[a-zA-Z]+;base64,/, ""), imgFileName, catObj.imgFileName,breed));
    console.log(picFileStore);
       
    const request = await fetch(getCatsURL, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(updatedCat), 
        });
    
        formEl.reset();
        window.location = `http://localhost:3000`;//Redirect to home
})

async function assignAPicture(fileName, element) {//Helper for the current picture name assigment to the DOM
    const picRequest = await (await fetch(`http://localhost:3000/data/Pictures/${fileName}`)).blob();

    picFileStore = new File([picRequest], fileName, { type: picRequest.type });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(picFileStore);
    
    element.files = dataTransfer.files;
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

class Cat { // Update cat object Schema
    constructor(innerID, name, description, imgFile, imgFileName, oldImgFileName, breed) {
        this.innerID = innerID;
        this.name = name;
        this.description = description;
        this.imgFile = imgFile;
        this.imgFileName = imgFileName
        this.oldImgFileName = oldImgFileName
        this.breed = breed; 
    };
}