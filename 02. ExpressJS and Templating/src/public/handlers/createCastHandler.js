const formEl = document.querySelector(`form`);

formEl.addEventListener(`submit`, async (e) => {
    e.preventDefault();

    const formData = new FormData(formEl);
    let { name, age, born, nameInMovie, imgURL } = Object.fromEntries(formData.entries());

    const req = await fetch(`http://localhost:3000/createCast`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            name: name,
            age: age,
            born: born,
            // nameInMovie: nameInMovie,
            imgURL: imgURL
        }),
    });
    const data = await req.json()

    if (req.status == 400) {
        window.alert(data)
        
    } else if (req.status === 201) {
        window.location = `/`
    }
})