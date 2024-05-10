// Función para validar el correo electrónico
function validateEmail(email) {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Función para validar el correo electrónico y contraseña, y redireccionar si ambos son válidos
function validateAndRedirect() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('idpass1');
    let emailFeedback = document.querySelector('.invalid-feedback-email');
    let passwordFeedback = document.querySelector('.invalid-feedback-password');

    let isEmailValid = validateEmail(emailInput.value);
    let isPasswordValid = passwordInput.value.trim().length > 0;

    if (isEmailValid && isPasswordValid) {
        // Si el correo electrónico y la contraseña son válidos, redirigir a la página AdminOpciones.html
        window.location.href = "index.html";
    } else {
        // Resto del código de validación...
    }
}

// Validar automáticamente el campo de correo electrónico al cambiar su valor
document.getElementById('email').addEventListener('input', function() {
    let emailInput = this;
    let emailFeedback = document.querySelector('.invalid-feedback-email');
    let isEmailValid = validateEmail(emailInput.value);

    if (isEmailValid) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        emailFeedback.innerHTML = "";
    } else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        emailFeedback.innerHTML = "Por favor, ingrese un correo electrónico válido.";
    }
});
