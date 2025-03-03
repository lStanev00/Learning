catShelter = (ID ,breed, description, imgFileName, name) =>`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/styles/site.css">
    <link rel="shortcut icon" type="image/png" href="/data/Pictures/pawprint.png" />
    <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
    <title>Cat Shelter</title>
</head>

<body>
    <header>
        <nav>
            <ul class="navigation">
                <li><a href="/">Home Page</a></li>
                <li><a href="/cats/add-breed">Add Breed</a></li>
                <li><a href="/cats/add-cat">Add Cat</a></li>
            </ul>
        </nav>
        <h1>Cat Shelter</h1>
    </header>
    <main>
        <form action="#" method="" class="cat-form">
            <h2>Shelter the cat</h2>
            <img src="http://localhost:3000/data/Pictures/${imgFileName}" alt="${name}">
            <label for="name">Name</label>
            <input type="text" id="name" value="${name}" disabled>
            <label for="description">Description</label>
            <textarea id="description" disabled>${description}</textarea>
            <label for="group">Breed</label>
            <select id="group" disabled>
                <option value="${breed}">${breed}</option>
            </select>
            <button>SHELTER THE CAT</button>
        </form>
    </main>
</body>
<script>
const link = "http://localhost:3000/"
const cat = {
    ID: "${ID}",
    breed: "${breed}",
    description: "${description}",
    imgFileName: "${imgFileName}",
    name: "${name}"
}

document.querySelector("button").addEventListener("click", async (e) => {
        e.preventDefault();
        deleteReq(cat);
        window.location = link;//Redirect to home

})


async function deleteReq(catInfo) {
    const req = await fetch(link + "data/cats", {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(catInfo),
    });

    return await req.json()
}
</script>

</html>`

module.exports = catShelter;