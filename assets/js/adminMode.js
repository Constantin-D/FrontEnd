// Mode administrateur

// Récupérer le token depuis le localStorage
const token = localStorage.getItem("token");

if (token) {
    console.log(token);
    // Appeler la fonction logout
    logout();

    // Afficher la barre noire
    const editModeBar = document.getElementById("editModeBar");
    editModeBar.innerHTML = `
        <i class="fa-solid fa-pen-to-square"></i>
        <span>Mode édition</span>
    `;
    editModeBar.style.display = "flex";

    // Faire disparaître les filtres
    const filters = document.getElementById("filters");
    if (filters) {
        filters.classList.add("hidden");
        console.log("filters");
    }

    //Ajouter l'icône de modification et le texte "modifier"
    const filtersHidden = document.querySelector("#portfolio h2");
    if (filtersHidden) {
        // Ajouter l'icône de modification
        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-pen-to-square", "edit-icon"); // Ajouter la classe edit-icon pour l'icône
        filtersHidden.appendChild(editIcon);

        // Ajouter le texte "modifier"
        const editText = document.createElement("span");
        editText.textContent = "modifier";
        editText.classList.add("edit-text"); // Ajouter la classe edit-text pour le texte "modifier"
        filtersHidden.appendChild(editText);

        // Ajouter un écouteur d'événements pour l'icône de modification
        editIcon.addEventListener("click", () => {
            // Ouvrir la modale
            const modalContainer = document.querySelector("#modalContainer");
            modalContainer.setAttribute("aria-hidden", "true"); // Afficher la modale
            modalContainer.classList.toggle("active");
        });
    }
}

// Fonction pour se déconnecter
function logout() {
    const connectionLink = document.getElementById("connectionLink");
    connectionLink.innerText = "logout";
    connectionLink.href = "./index.html";
    connectionLink.addEventListener("click", () => {
        localStorage.removeItem("token");
    });
}
