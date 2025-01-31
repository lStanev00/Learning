const formEl = document.querySelector(`form`);

formEl.addEventListener(`submit`, async (e) => {
    e.preventDefault();

    const formData = new FormData(formEl);
    let { category, description, director, genre, imgURL, rating, title, year } = Object.fromEntries(formData.entries());
    rating = Number(rating);
    year = Number(year);
    console.log({
        category: category,
        description: description,
        director: director,
        genre: genre,
        imgURL: imgURL,
        rating: rating,
        title: title,
        year: year,
    });
    

    const req = await fetch(`http://localhost:3000/addMovie`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            category: category,
            description: description,
            director: director,
            genre: genre,
            imgURL: imgURL,
            rating: rating,
            title: title,
            year: year,
        }),
    });

    if (req.status == 400) {
        const data = await req.json()
        window.alert(errorToMSG(data))
        
    } else if (req.status === 201) {
        window.location = `/`
    }
})

function errorToMSG(arr){
    let msgBuild = arr.shift();
    if (arr.length < 1) return msgBuild
    for (const error of arr) {
        msgBuild += `\n` + error
    };
    return msgBuild
}