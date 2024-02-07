
let works = [];

async function getWorks() {
    await fetch("http://localhost:5678/api/works")
        .then((Response) => Response.json())
        .then((dataWorks) => {
            console.log(dataWorks);
            works = dataWorks;
            return works;
        })
        .catch((error) => console.error("Erreur :", error));
}

async function displayAllWorksInHtml() {
    await getWorks();
    console.log(works);
    arrayWorks.forEach(element => {
        
    }); 
}

displayAllWorksInHtml();
