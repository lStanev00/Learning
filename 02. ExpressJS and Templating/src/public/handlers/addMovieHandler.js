const formEl = document.querySelector(`form`);

formEl.addEventListener(`submit`, async (e) => {
    e.preventDefault();

    const formData = new FormData(formEl);
    let { category, description, director, genre, imageURL, rating, title, year } = Object.fromEntries(formData.entries());
    rating = Number(rating);
    year = Number(year);

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
            imageURL: imageURL,
            rating: rating,
            title: title,
            year: year,
        }),
    });
})