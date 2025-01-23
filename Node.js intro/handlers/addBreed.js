const targetURL = `http://localhost:3000`

document.querySelector("form").addEventListener(`submit`, async (e) => {
    e.preventDefault();

    const inputEl = document.querySelector("#breed-name");

    //Basic error handling
    if(inputEl.value === `` || (inputEl.value).length < 3) {
        alert(`The breed has to be at last 3 characters long!\nPlease check your input.`);
        return
    }
    
    const getReq = await fetch(targetURL + `/data/breeds`);
    const getData = await getReq.json();

    getData.push(inputEl.value);

    const postReq = await fetch(targetURL + `/data/breeds`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: (JSON.stringify(getData)),
    });

    const postData = await postReq.json();
    console.log(postData);
    alert(postData); //I know is bad user expirience but the is a learning process
    inputEl.value = ``; // Clear the input text    
});