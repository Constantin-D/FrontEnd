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

            const deleteIcon = document.createElement("iDelete");
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

// document.addEventListener("DOMContentLoaded", function () {
const modalContainer = document.getElementById("modalContainer");
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

// fonction pour supprimer (works) une Vignette
async function deleteWork(workId) {
    console.log(workId);
    console.log(token);
    debugger;
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

//
// Code JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Récupérer les éléments du formulaire
    const form = document.getElementById("dataForm");
    const submitButton = document.querySelector(".uploadSubmit");
    const imageInput = document.getElementById("file-picture");
    const fieldDrop = document.querySelector(".modal-secondary .field-drop");
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.style.color = "red";
    fieldDrop.appendChild(errorMessage);

    // Ajouter un écouteur d'événement sur le changement de l'input file pour afficher la prévisualisation de l'image
    imageInput.addEventListener("change", function (e) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    // Ajouter un écouteur d'événement sur la soumission du formulaire
    form.addEventListener("submit", function (event) {
        // Valider le formulaire
        if (!validateForm()) {
            event.preventDefault(); // Empêcher la soumission du formulaire si la validation échoue
        }
    });

    // Fonction de validation du formulaire
    function validateForm() {
        let isValid = true;
        errorMessage.textContent = ""; // Réinitialiser le message d'erreur

        // Valider le titre
        const title = document.getElementById("title").value.trim();
        if (title === "") {
            errorMessage.textContent = "Veuillez saisir un titre.";
            isValid = false;
        }

        // Valider la catégorie
        const category = document.getElementById("category-style").value.trim();
        if (category === "") {
            errorMessage.textContent = "Veuillez sélectionner une catégorie.";
            isValid = false;
        }

        // Valider l'image
        const image = imageInput.files[0];
        if (!image) {
            errorMessage.textContent = "Veuillez sélectionner une image.";
            isValid = false;
        } else if (!["image/jpeg", "image/png"].includes(image.type)) {
            errorMessage.textContent =
                "Veuillez sélectionner une image au format jpg ou png.";
            isValid = false;
        } else if (image.size > 4 * 1024 * 1024) {
            // 4 Mo en octets
            errorMessage.textContent =
                "La taille de l'image ne doit pas dépasser 4 Mo.";
            isValid = false;
        }

        // Retourner true si le formulaire est valide, sinon false
        return isValid;
    }
});

