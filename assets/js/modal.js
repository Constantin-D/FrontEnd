// const modifyIcon = document.createElement("edit-iccon")

// Fonction pour récupérer les travaux depuis l'API et les afficher dans la modal
async function displayWorksInModal1() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();

        // Sélectionner la div image-gallery-modal
        const modalGallery = document.querySelector(".image-gallery-modal");

        // Parcourir les travaux et les afficher dans la modal
        works.forEach((work) => {
           
            const workThumbnail = document.createElement("figure");
            workThumbnail.classList.add("work-thumbnail");
            
            const thumbnailImage = document.createElement("img");
            thumbnailImage.src = work.imageUrl;
            workThumbnail.appendChild(thumbnailImage);
        
            const deleteIcon = document.createElement("iDelete");
            deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
            workThumbnail.appendChild(deleteIcon);
            // Ajouter la vignette à la modal
            modalGallery.appendChild(workThumbnail);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}

// Appeler la fonction pour afficher les travaux dans la modal
displayWorksInModal1();

document.addEventListener("DOMContentLoaded", function () {
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

    // editIcon.addEventListener("click", () => {
    //     openPrimaryModal(); // Ouvrir la primaryModal
    // });
});


