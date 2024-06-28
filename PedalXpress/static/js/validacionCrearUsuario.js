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

// Validación de RUT
document.addEventListener('input', (e) => {
  const rut = document.getElementById('rut');

  if (e.target === rut) {
    let rutFormateado = darFormatoRUT(rut.value);
    rut.value = rutFormateado;
  }
});

function darFormatoRUT(rut) {
  const rutLimpio = rut.replace(/[^0-9kK]/g, '');
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();

  if (rutLimpio.length < 2) return rutLimpio;

  let cuerpoFormatoMiles = cuerpo
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/(?=\d*\.?)(\d{3})/g, '$1.');

  cuerpoFormatoMiles = cuerpoFormatoMiles
    .split('')
    .reverse()
    .join('')
    .replace(/^[\.]/, '');

  return `${cuerpoFormatoMiles}-${dv}`;
}

document.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) ejecutarValidacion();
});

document.addEventListener('click', (e) => {
  const botonValidarRUT = document.getElementById('btn-valida-rut');

  if (e.target === botonValidarRUT) {
    ejecutarValidacion();
  }
});

function ejecutarValidacion() {
  const rut = document.getElementById('rut').value;
  const resultado = validarRUT(rut);
  const salida = document.querySelector('.salida');

  if (!rut) {
      salida.innerHTML = `<p style="color: red;">Debes ingresar un RUT</p>`;
  } else if (resultado === true) {
      salida.innerHTML = `<p style="color: darkgreen;">El RUT ${rut} es válido</p>`;
  } else {
      salida.innerHTML = `<p style="color: red;">El RUT ${rut} no es válido</p>`;
  }

  document.getElementById('rut').value = '';
}

function validarRUT(rut) {
  const rutLimpio = rut.replace(/[^0-9kK]/g, '');
  if (rutLimpio.length < 2) return false;

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();
  if (!cuerpo.replace(/[^0-9]/g, '')) return false;

  const dvCalculado = calcularDV(cuerpo);
  return dvCalculado == dv;
}

function calcularDV(cuerpoRUT) {
  let suma = 1;
  let multiplo = 0;

  for (; cuerpoRUT; cuerpoRUT = Math.floor(cuerpoRUT / 10))
      suma = (suma + (cuerpoRUT % 10) * (9 - (multiplo++ % 6))) % 11;

  return suma ? suma - 1 : 'K';
}

// Validar contraseñas coincidentes
document.getElementById('id_password2').addEventListener('input', function() {
  var pass1 = document.getElementById('id_password1').value;
  var pass2 = document.getElementById('id_password2').value;
  var pass2Error = document.getElementById('pass2Error');

  if (pass1 !== pass2) {
      pass2Error.textContent = 'Las contraseñas no coinciden';
      document.getElementById('id_password2').setCustomValidity('Las contraseñas no coinciden');
  } else {
      pass2Error.textContent = '';
      document.getElementById('id_password2').setCustomValidity('');
  }
});
