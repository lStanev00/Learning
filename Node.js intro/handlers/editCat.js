const curentCat = decodeURIComponent((window.location.href).replace("http://localhost:3000/editCat/", ``));
const allCats = await(await fetch("http://localhost:3000/data/cats")).json();

const catObj = allCats.find(obj => obj["name"] == curentCat);

(async function domBuilder(catObj){
    const container = document.querySelector(`form`);
    
    const title = document.createElement(`h2`);
    title.textContent = `Edit Cat`;

    const nameLabel = document.createElement(`label`);
    nameLabel.setAttribute(`for`, `name`);
    nameLabel.textContent = `Name`;

    const nameInput = document.createElement(`input`);
    nameInput.type = `text`;
    nameInput.id = `name`;
    nameInput.value = catObj.name;

    const descLabel = document.createElement(`label`);
    descLabel.setAttribute(`for`, `description`);
    descLabel.textContent = `Description`;

    const descTextarea = document.createElement(`textarea`);
    descTextarea.id = `description`;
    descTextarea.textContent = catObj.description;

    const imageLabel = document.createElement(`label`);
    imageLabel.setAttribute(`for`, `image`);
    imageLabel.textContent = `Image`;

    const imageInput = document.createElement(`input`);
    imageInput.type = `file`;
    imageInput.id = `image`;

    const groupLabel = document.createElement(`label`);
    groupLabel.setAttribute(`for`, `group`);
    groupLabel.textContent = `Breed`;

    const groupSelect = document.createElement(`select`);
    groupSelect.id = `group`;

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
    container.append(title, nameLabel, nameInput, descLabel, descTextarea, imageLabel, imageInput, groupLabel, groupSelect, editButton);
})(catObj);