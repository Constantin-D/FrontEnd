const imagePreview = document.getElementById("image-preview");
const btnAddPicture = document.getElementById("btn-add-picture");


// Fonction pour récupérer les travaux depuis l'API et les afficher dans la modal
async function displayWorksInModal1() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();

        // Sélectionner la div image-gallery-modal
        const modalGallery = document.querySelector(".image-gallery-modal");
        modalGallery.innerHTML = "";
        // Parcourir les travaux et les afficher dans la modal
        works.forEach((work) => {
            const workThumbnail = document.createElement("figure");
            workThumbnail.classList.add("work-thumbnail");

            const thumbnailImage = document.createElement("img");
            thumbnailImage.src = work.imageUrl;
            workThumbnail.appendChild(thumbnailImage);

            const deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
            deleteIcon.addEventListener("click", (e) => {
                deleteWork(work.id);
            });
            workThumbnail.appendChild(deleteIcon);
            // Ajouter la vignette à la modal
            modalGallery.appendChild(workThumbnail);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}

displayWorksInModal1();


// Récupérer les éléments des modales
const modalContainer = document.querySelector("#modalContainer");
const primaryModal = document.querySelector(".modal-primary");
const secondaryModal = document.querySelector(".modal-secondary");
const closeModalButtons = document.querySelectorAll(".close");
const overlay = document.querySelector(".overlay");
const btnAddPhoto = document.querySelector(".btn-modal1");
const btnReturn = document.querySelector(".arrowReturn");

// Fonction pour ouvrir et fermer les modales
function openPrimaryModal() {
    modalContainer.classList.add("active");
    primaryModal.classList.remove("hidden");
}

function closePrimaryModal() {
    modalContainer.classList.remove("active");
    primaryModal.classList.add("hidden");
}

function openSecondaryModal() {
    primaryModal.classList.add("hidden");
    secondaryModal.classList.remove("hidden");
}

function closeSecondaryModal() {
    modalContainer.classList.remove("active");
    secondaryModal.classList.add("hidden");
    primaryModal.classList.add("active");
    primaryModal.classList.remove("hidden");
}

function returnToPrimaryModal() {
    secondaryModal.classList.add("hidden");
    primaryModal.classList.remove("hidden");
}

// Ajouter des écouteurs d'événements
closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        closePrimaryModal();
        closeSecondaryModal();
    });
});

overlay.addEventListener("click", () => {
    closePrimaryModal();
    closeSecondaryModal();
});

btnAddPhoto.addEventListener("click", () => {
    openSecondaryModal();
});

btnReturn.addEventListener("click", () => {
    returnToPrimaryModal();
});




// fonction pour supprimer (works) une ou plusieurs Vignette
async function deleteWork(workId) {
    console.log(workId);
    console.log(token);
    
    try {
        await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    // La suppression a réussi, actualiser le DOM
                    displayAllWorksInHtml();
                    displayWorksInModal1();
                    console.log("Le travail a été supprimé avec succès.");
                } else {
                    // La suppression a échoué, afficher un message d'erreur
                    console.error("Erreur lors de la suppression du travail.");
                }
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la suppression du travail:",
                    error
                );
            });
    } catch (error) {
        console.log(error);
    }
}



// Récupérer les éléments du formulaire
const form = document.querySelector("#dataForm");
const submitButton = document.querySelector(".uploadSubmit");
const imageInput = document.querySelector("#file-picture");
const titleInput = document.querySelector("#title");

// Créer le nouveau label
const categoryLabel = document.createElement("label");
categoryLabel.setAttribute("for", "categoryStyle");
categoryLabel.textContent = "Catégorie";

// Créer le nouveau champ "category"
const categoryInput = document.createElement("select");
categoryInput.id = "categoryStyle";
categoryInput.name = "category";

// Créer les options
const categoriesForSelect = [
    { value: "", text: "" },
    { value: "1", text: "Objets" },
    { value: "2", text: "Appartements" },
    { value: "3", text: "Hôtels & Restaurants" },
]; // Remplacez par les catégories
categoriesForSelect.forEach(function (category) {
    const optionElement = document.createElement("option");
    optionElement.value = category.value;
    optionElement.textContent = category.text;
    categoryInput.appendChild(optionElement);
});

// Insérer le label et le champ "select" après le champ "title"
titleInput.parentNode.insertBefore(categoryLabel, titleInput.nextSibling);
titleInput.parentNode.insertBefore(categoryInput, categoryLabel.nextSibling);

// Créer des éléments de message d'erreur pour chaque champ de formulaire
const titleErrorMessage = createErrorMessage();
titleInput.parentNode.insertBefore(titleErrorMessage, titleInput.nextSibling);
const categoryErrorMessage = createErrorMessage();
categoryInput.parentNode.insertBefore(
    categoryErrorMessage,
    categoryInput.nextSibling
);
const imageErrorMessage = createErrorMessage();
imageInput.parentNode.insertBefore(imageErrorMessage, imageInput.nextSibling);

// Ajouter un écouteur d'événement sur la soumission du formulaire
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Valider le formulaire
    if (validateForm()) {
        console.log(form);
        const formData = new FormData(form);
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log("Le travail a été créé avec succès.");
                    return response.json();
                }
            })
            .then((work) => {
                console.log(work);
                displayWorksInModal1();
                displayAllWorksInHtml();
                imagePreview.style.display = "none";
                form.reset();
                closeSecondaryModal();
            })
            .catch((error) => {
                console.error("Erreur lors de la création du travail:", error);
            });
        console.log(form);
    }
});

// Ajouter un écouteur d'événement sur le clic pour masquer les messages d'erreur
document.addEventListener("click", function () {
    titleErrorMessage.style.display = "none";
    categoryErrorMessage.style.display = "none";
    imageErrorMessage.style.display = "none";
});

// Fonction pour créer un élément de message d'erreur
function createErrorMessage() {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.style.color = "red";
    errorMessage.style.display = "none"; // Masquer par défaut
    return errorMessage;
}


// Fonction de validation du formulaire
function validateForm() {
    let isValid = true;

    // Valider le titre
    const title = titleInput.value.trim();
    if (title === "") {
        titleErrorMessage.textContent = "Veuillez saisir un titre.";
        titleErrorMessage.style.display = "block"; // Afficher le message d'erreur
        isValid = false;
    }

    // Valider la catégorie
    const category = categoryInput.value.trim();
    if (category === "") {
        categoryErrorMessage.textContent =
            "Veuillez sélectionner une catégorie.";
        categoryErrorMessage.style.display = "block"; // Afficher le message d'erreur
        isValid = false;
    }


    // Valider l'image
    const image = imageInput.files[0];
    if (!image) {
        imageErrorMessage.textContent = "Veuillez sélectionner une image.";
        imageErrorMessage.style.display = "block"; // Afficher le message d'erreur
        isValid = false;
    } else if (!["image/jpeg", "image/png"].includes(image.type)) {
        imageErrorMessage.textContent =
            "Veuillez sélectionner une image au format jpg ou png.";
        imageErrorMessage.style.display = "block"; // Afficher le message d'erreur
        isValid = false;
    } else if (image.size > 4 * 1024 * 1024) {
        // 4 Mo en octets
        imageErrorMessage.textContent =
            "La taille de l'image ne doit pas dépasser 4 Mo.";
        imageErrorMessage.style.display = "block"; // Afficher le message d'erreur
        isValid = false;
    }

    // Retourner true si le formulaire est valide, sinon false
    return isValid;
}

// Fonction pour vérifier si tous les champs sont valides
function checkValidity() {
    if (
        titleInput.value.trim() !== "" &&
        categoryInput.value.trim() !== "" &&
        imageInput.files.length > 0
    ) {
        submitButton.style.backgroundColor = "#1d6154"; // Changer la couleur du bouton submit en vert
        submitButton.disabled = false; // Activer le bouton submit
    } else {
        submitButton.style.backgroundColor = ""; // Réinitialiser la couleur du bouton submit
        submitButton.disabled = true; // Désactiver le bouton submit
    }
}

// Ajouter des écouteurs d'événements sur les champs du formulaire pour vérifier la validité
titleInput.addEventListener("input", checkValidity);
categoryInput.addEventListener("input", checkValidity);
imageInput.addEventListener("change", checkValidity);

// Ajouter un écouteur d'événement sur le changement de l'input file pour afficher la prévisualisation de l'image
imageInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            btnAddPicture.style.display = "none";
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});






