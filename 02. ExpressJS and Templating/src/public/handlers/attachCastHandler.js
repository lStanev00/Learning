const formEl = document.querySelector(`form`);

formEl.addEventListener(`submit`, async (e) => {
    e.preventDefault();
    const castID = Object.fromEntries((new FormData(formEl)).entries());
    console.log(castID);
    
    
    const res = await fetch(window.location.href, {
        headers: {
            "Content-Type": "application/json"
        },
        method: `POST`,
        body: JSON.stringify(castID),
    })
})