const passwordInput = document.getElementById("password");
const toggleButton = document.getElementById("togglePassword");

toggleButton.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "🙈"; // Hide icon
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "👁️"; // Show icon
    }
});
