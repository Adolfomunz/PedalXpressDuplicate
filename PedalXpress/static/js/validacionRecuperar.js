// validacionRecuperarContraseña.js

document.getElementById("passwordRecoveryForm").onsubmit = function() {
    var email = document.getElementById("email").value;
    if (email.trim() === "") {
        alert("Por favor ingrese su correo electrónico antes de recuperar su contraseña.");
        return false; // Evita que se envíe el formulario
    } else {
        // Aquí puedes agregar el código para mostrar un mensaje después de enviar el formulario
        alert("Se ha enviado un correo electrónico para recuperar su contraseña.");
    }
};