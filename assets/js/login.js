// Variables globales
const loginForm = document.querySelector(".identifyForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");

// Écouteur d'événement pour la soumission du formulaire de connexion
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let validationCount = 0;

    // Vérifier si le champ email est vide ou invalide
    if (emailInput.value === "") {
        emailError.textContent = "Veuillez entrer un email.";
        emailError.style.color = "red";
        emailInput.style.border = "1px solid red";
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Veuillez entrer un email valide.";
        emailError.style.color = "red";
        emailInput.style.border = "1px solid red";
    } else {
        validationCount++;
        emailError.textContent = "";
        emailInput.style.border = "1px solid green";
    }

    // Vérifier si le champ mot de passe est vide
    if (passwordInput.value === "") {
        passwordError.textContent = "Veuillez entrer un mot de passe.";
        passwordError.style.color = "red";
        passwordInput.style.border = "1px solid red";
    } else {
        passwordError.textContent = "";
        passwordInput.style.border = "1px solid green";
        validationCount++;
    }

    // Si les deux champs sont validés, envoyer les données au serveur
    if (validationCount === 2) {
        const formData = {
            email: emailInput.value,
            password: passwordInput.value,
        };

        try {
            // Envoyer les données d'authentification au serveur
            const response = await fetch(
                "http://localhost:5678/api/users/login",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                // Récupérer le token de la réponse
                const responseData = await response.json();
                const token = responseData.token;

                // Enregistrer le token dans le localStorage
                localStorage.setItem("token", token);
                // Authentification réussie, redirection vers la page d'accueil
                window.location.href = "/index.html";
            } else {
                // Afficher un message d'erreur en cas d'échec de l'authentification
                const errorMessage = document.createElement("p");
                errorMessage.textContent =
                    "Erreur dans l'identifiant ou le mot de passe.";
                errorMessage.style.color = "red";

                // Insérer le message d'erreur après le titre "Log in"
                const loginTitle = document.querySelector(".loginPage h2");
                loginTitle.parentNode.insertBefore(
                    errorMessage,
                    loginTitle.nextSibling
                );

                emailInput.style.borderColor = "red";
                passwordInput.style.borderColor = "red";
            }
        } catch (error) {
            console.error("Erreur lors de la requête : ", error);
            alert("Une erreur est survenue. Veuillez réessayer plus tard.");
        }
    }
});
