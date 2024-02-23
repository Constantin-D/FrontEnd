const token = localStorage.getItem("token");

if (token) {
    console.log(token);
    logout();

    // Afficher la barre noire
    const editModeBar = document.getElementById("editModeBar");
    editModeBar.innerHTML = `
        <i class="fa-solid fa-pen-to-square"></i>
        <span>Mode édition</span>
    `;
    editModeBar.style.display = "flex";

    // Ecouteur d'événement au clic sur l'icône de modification pour ouvrir la modale
    editIcon.addEventListener("click", () => {});

    // Faire disparaître les filtres
    document.getElementById("filters").classList.add("hidden");

    //Ajouter l'icône de modification et le texte "modifier"
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");
    editIcon.style.color = "#1d6154";
    editIcon.style.size = "1rem";

    const editText = doc.createElement("span");
    editText.textContent = "modifier";
    editText.style.color = "#1d6154";
    editText.style.size = "1rem";

    // Ecouteur d'événement au clic sur l'icône modification pour ouvrir la modale
    editIcon.addEventListener("clic", () => {});
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
