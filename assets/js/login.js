// Variables globales
const loginForm = document.querySelector(".identifyForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Écouteur d'événement pour la soumission du formulaire de connexion
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    const formData = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        // Envoyer les données d'authentification au serveur
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // Authentification réussie, redirection vers la page d'accueil
            window.location.href = "/index.html";
        } else {
            // Afficher un message d'erreur en cas d'échec de l'authentification
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe.";
            errorMessage.style.color = "red";

            // Insérer le message d'erreur après le titre "Log in"
            const loginTitle = document.querySelector(".loginPage h2");
            loginTitle.parentNode.insertBefore(errorMessage, loginTitle.nextSibling);

            // Appliquer les styles aux champs email et mot de passe
            emailInput.style.borderColor = "red";
            passwordInput.style.borderColor = "red";
        }
    } catch (error) {
        console.error("Erreur lors de la requête : ", error);
        // Afficher un message d'erreur à l'utilisateur en cas de problème de connexion
        alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
});

