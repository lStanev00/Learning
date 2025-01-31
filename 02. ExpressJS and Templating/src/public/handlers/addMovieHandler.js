const formEl = document.querySelector(`form`);

formEl.addEventListener(`submit`, async (e) => {
    e.preventDefault();

    const formData = new FormData(formEl);
    console.log(Object.fromEntries(formData.entries()));

    const req = await fetch(`http://localhost:3000/addMovie`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
})