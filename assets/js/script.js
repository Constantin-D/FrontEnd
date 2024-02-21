// // Variables Globales
// let works = [];
// let galleryElement = document.querySelector(".gallery");
// let categories = [];
// let filtersElement = document.querySelector("#filters");

// // Fonction asynchrone pour récupérer les données des travaux depuis l'API
// async function getWorks() {
//     const response = await fetch("http://localhost:5678/api/works")
//         .catch((error) => {
//             console.error("Erreur lors de la récupération des travaux :", error);
//         });
//     works = await response.json();
//     console.log(works);
// }

// // Fonction asynchrone pour afficher tous les travaux dans la galerie HTML
// async function displayAllWorksInHtml() {
//     await getWorks();
//     works.forEach(function (work) {
//         const figureElement = document.createElement("figure");
//         figureElement.setAttribute("data-category", work.categoryId);
//         const imageElement = document.createElement("img");
//         imageElement.src = work.imageUrl;
//         const figcaptionElement = document.createElement("figcaption");
//         figcaptionElement.textContent = work.title;
//         figureElement.appendChild(imageElement);
//         figureElement.appendChild(figcaptionElement);
//         galleryElement.appendChild(figureElement);
//     });
// }

// // Fonction asynchrone pour récupérer les données des catégories depuis l'API
// async function getCategories() {
//     const response = await fetch("http://localhost:5678/api/categories")
//         .catch((error) => {
//             console.error("Erreur lors de la récupération des catégories :", error);
//         });
//     categories = await response.json();
//     console.log(categories);
// }

// // Fonction asynchrone pour afficher toutes les catégories dans les filtres HTML
// async function displayAllCategoriesInHtml() {
//     await getCategories();

//     // Création du bouton "All Categories"
//     const allCategoriesButton = document.createElement("button");
//     allCategoriesButton.textContent = "Tous";
//     allCategoriesButton.setAttribute("data-category-id", "0");
//     allCategoriesButton.addEventListener("click", filterWorksByCategory);
//     filtersElement.appendChild(allCategoriesButton);

//     // Affichage des boutons des autres catégories
//     categories.forEach(function (category) {
//         const buttonElement = document.createElement("button");
//         buttonElement.textContent = category.name;
//         buttonElement.setAttribute("data-category-id", category.id);
//         buttonElement.addEventListener("click", filterWorksByCategory);
//         filtersElement.appendChild(buttonElement);
//     });
// }

// // Fonction pour filtrer les traveaux par catégorie
// async function filterWorksByCategory(event) {
//     const categoryId = event.target.getAttribute("data-category-id");

//     // Récupération de tous les éléments figure de la galerie
//     const figureElements = document.querySelectorAll(".gallery figure");
    
//     // Masquer tous les travaux
//     figureElements.forEach(function (figure) {
//         figure.classList.toggle("hidden", true);
//     });

//     // Afficher les travaux correspondant à la catégorie sélectionnée
//     if (categoryId === "0") {
//         // Si la catégorie est "All Categories", afficher tous les travaux
//         figureElements.forEach(function (figure) {
//             figure.classList.toggle("hidden", false);
//         });
//     } else {
//         // Sinon, afficher les travaux correspondant à la catégorie
//         const selectedFigureElements = document.querySelectorAll(
//             '.gallery figure[data-category="' + categoryId + '"]'
//         );
//         selectedFigureElements.forEach(function (figure) {
//             figure.classList.toggle("hidden", false);
//         });
//     }
// }

// // Appel des fonctions pour afficher toutes les travaux et toutes les catégories
// // filterWorksByCategory();
// displayAllWorksInHtml();
// displayAllCategoriesInHtml();


// Variables Globales
let works = [];
let galleryElement = document.querySelector(".gallery");
let categories = [];
let filtersElement = document.querySelector("#filters");

// Fonction asynchrone pour récupérer les données des travaux depuis l'API
async function getWorks() {
    await fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
            works = data;
            console.log(works);
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des travaux :", error);
        });
}

// Fonction asynchrone pour afficher tous les travaux dans la galerie HTML
async function displayAllWorksInHtml() {
    await getWorks();
    works.forEach(function (work) {
        const figureElement = document.createElement("figure");
        figureElement.setAttribute("data-category", work.categoryId);
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.textContent = work.title;
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        galleryElement.appendChild(figureElement);
    });
}

// Fonction asynchrone pour récupérer les données des catégories depuis l'API
async function getCategories() {
    await fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {
            categories = data;
            console.log(categories);
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des catégories :", error);
        });
}

// Fonction asynchrone pour afficher toutes les catégories dans les filtres HTML
async function displayAllCategoriesInHtml() {
    await getCategories();

    // // Ajouter la catégorie "Tous" au début du tableau des catégories
    categories.unshift({ id: 0, name: "Tous" });
    // categories.splice(0, 0, "Tous")

    // // Création du bouton "Tous"
    // const allCategoriesButton = document.createElement("button");
    // allCategoriesButton.textContent = "Tous";
    // allCategoriesButton.setAttribute("data-category-id", "0");
    // allCategoriesButton.addEventListener("click", filterWorksByCategory);
    // filtersElement.appendChild(allCategoriesButton);

    // Affichage des boutons des autres catégories
    categories.forEach(function (category) {
        const buttonElement = document.createElement("button");
        buttonElement.textContent = category.name;
        buttonElement.setAttribute("data-category-id", category.id);
        buttonElement.addEventListener("click", filterWorksByCategory);
        filtersElement.appendChild(buttonElement);
    });
}

// Fonction pour filtrer les traveaux par catégorie
async function filterWorksByCategory(event) {
    const categoryId = event.target.getAttribute("data-category-id");

    // Récupération de tous les éléments figure de la galerie
    const figureElements = document.querySelectorAll(".gallery figure");
    
    // Masquer tous les travaux
    figureElements.forEach(function (figure) {
        figure.classList.toggle("hidden", true);
    });

    // Afficher les travaux correspondant à la catégorie sélectionnée
    if (categoryId === "0") {
        // Si la catégorie est "All Categories", afficher tous les travaux
        figureElements.forEach(function (figure) {
            figure.classList.toggle("hidden", false);
        });
    } else {
        // Sinon, afficher les travaux correspondant à la catégorie
        const selectedFigureElements = document.querySelectorAll(
            '.gallery figure[data-category="' + categoryId + '"]'
        );
        selectedFigureElements.forEach(function (figure) {
            figure.classList.toggle("hidden", false);
        });
    }
}

// Appel des fonctions pour afficher toutes les travaux et toutes les catégories
// filterWorksByCategory();
displayAllWorksInHtml();
displayAllCategoriesInHtml();



