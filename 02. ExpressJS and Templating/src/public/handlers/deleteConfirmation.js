const uri = `http://localhost:3000/delete/`
document.querySelector("#delete-button").addEventListener(`click`, async (e) => {
    e.preventDefault();
    const movieID = (window.location.pathname).replace(`/details/`, ``);

    if (confirm(`Are you shure you want to delete this movie?`)) {
        const req = await fetch(uri + movieID, {
            method: `POST`,   
        });
        const data = await req.json();
        if (req.status === 404) {
            window.alert(data.message);
        } else if (req.status === 200) {
            window.location = `/`;
            window.alert(data.message);
        }
    } else {
        window.alert(`Deleteion canceled`);
    }
});