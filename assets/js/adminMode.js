// Nouvelles fonctionnalités à ajouter sans modifier le code existant
const token = localStorage.getItem("token");

if (token) {
    console.log(token);
    logout();
    // Afficher la barre noire
}

// Fonction pour se déconnecter
function logout() {
    let connectionLink = document.getElementById("connectionLink");
    connectionLink.innerText = "logout";
    connectionLink.href = "./index.html";
    connectionLink.addEventListener("click", () => {
        localStorage.removeItem("token");
    });
}
