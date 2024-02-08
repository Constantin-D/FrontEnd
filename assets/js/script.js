let works = [];
let galleryElement = document.querySelector(".gallery");
let categories = [];
let filtersElement = document.querySelector("#filters");

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

// Récupération des Figures (balises <figure> + enfants)
async function displayAllWorksInHtml() {
    await getWorks();
    works.forEach((work) => {
        const figureElement = document.createElement("figure");
        figureElement.setAttribute("data-category", work.categoryId);
        const imageElement = document.createElement("img");
        const figcaptionElement = document.createElement("figcaption");
        imageElement.src = work.imageUrl;
        figcaptionElement.textContent = work.title;
        // figureElement.classList.add("gallery");
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        //document.main.appendchild(figcationElement);
        galleryElement.appendChild(figureElement);
    });
}

displayAllWorksInHtml();

async function getCategories() {
    await fetch("http://localhost:5678/api/categories")
        .then((Response) => Response.json())
        .then((dataCategories) => {
            console.log(dataCategories);
            categories = dataCategories;
            return categories;
        })
        .catch((error) => console.error("Erreur :", error));
}

async function displayAllCategoriesInHtml() {
    await getCategories();
    categories.forEach((category) => {});
}

displayAllCategoriesInHtml();

