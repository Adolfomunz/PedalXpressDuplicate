// Función para validar el correo electrónico
function validateEmail(email) {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Función para validar el correo electrónico y contraseña, y redireccionar si ambos son válidos
function validateAndRedirect() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('idpass1');
    let emailFeedback = emailInput.nextElementSibling;
    let passwordFeedback = passwordInput.nextElementSibling;

    let isEmailValid = validateEmail(emailInput.value);
    let isPasswordValid = passwordInput.value.trim().length > 0;

    if (isEmailValid) {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
    } else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
    }

    if (isPasswordValid) {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
    } else {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
    }

    if (isEmailValid && isPasswordValid) {
        // Si el correo electrónico y la contraseña son válidos, redirigir a la página AdminOpciones.html
        window.location.href = "AdminOpciones.html";
    }
}

// Validar automáticamente el campo de correo electrónico al cambiar su valor
document.getElementById('email').addEventListener('input', function() {
    let emailInput = this;
    let isEmailValid = validateEmail(emailInput.value);

    if (isEmailValid) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
    } else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
    }
});
