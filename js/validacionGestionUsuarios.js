// Variable global para almacenar el contador de IDs autoincrementables
var nextUserId = 1;

// Variable global para almacenar la instancia del modal de edición
var editModalInstance;

// Función para cargar usuarios de ejemplo al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    cargarUsuariosEjemplo();
    asignarEventos(); // Asignar eventos a los botones de edición
});

// Función para cargar usuarios de ejemplo
function cargarUsuariosEjemplo() {
    var usuariosEjemplo = [
        { id: obtenerIdUsuario(), nombre: "Juan", email: "juan@example.com", rut: "123456789", direccion: "Calle 123" },
        { id: obtenerIdUsuario(), nombre: "María", email: "maria@example.com", rut: "987654321", direccion: "Avenida Principal" },
        // Agrega más usuarios de ejemplo si lo deseas
    ];

    // Obtener la tabla de usuarios
    var tablaUsuarios = document.getElementById("tablaUsuarios").getElementsByTagName("tbody")[0];

    // Agregar usuarios de ejemplo a la tabla
    for (var i = 0; i < usuariosEjemplo.length; i++) {
        var usuario = usuariosEjemplo[i];
        var fila = document.createElement("tr");
        fila.innerHTML = "<td>" + usuario.nombre + "</td>" +
                         "<td>" + usuario.email + "</td>" +
                         "<td>" + usuario.rut + "</td>" +
                         "<td>" + usuario.direccion + "</td>" +
                         "<td><button class='btn btn-primary btn-sm btn-editar'>Editar</button>" +
                         "<button class='btn btn-danger btn-sm ms-1' onclick='eliminarUsuario(this)'>Eliminar</button></td>";
        tablaUsuarios.appendChild(fila);
    }
}

// Función para asignar eventos a los botones de edición
function asignarEventos() {
    var editButtons = document.querySelectorAll('.btn-editar');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            editarUsuario(this);
        });
    });
}

// Función para guardar los cambios al editar un usuario
function guardarCambiosUsuario() {
    var modal = document.getElementById('editUserModal');
    var id = modal.getAttribute('data-user-id'); // Obtener el ID del usuario
    var nombre = document.getElementById('editUsername').value;
    var email = document.getElementById('editEmail').value;
    var rut = document.getElementById('editRut').value;
    var direccion = document.getElementById('editDireccion').value;

    // Validar formato de correo electrónico
    if (!validarCorreoElectronico(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    // Validar formato de RUT
    if (!validarRUT(rut)) {
        alert('Por favor, ingrese un RUT válido.');
        return;
    }

    // Realizar aquí la lógica para guardar los cambios del usuario en el backend

    // Actualizar los valores en la fila de la tabla
    var row = document.querySelector("tr[data-user-id='" + id + "']");
    row.getElementsByTagName("td")[0].innerText = nombre;
    row.getElementsByTagName("td")[1].innerText = email;
    row.getElementsByTagName("td")[2].innerText = rut;
    row.getElementsByTagName("td")[3].innerText = direccion;

    // Cerrar el modal
    var editModalInstance = bootstrap.Modal.getInstance(modal);
    editModalInstance.hide();
}

// Función para validar el formato de correo electrónico
function validarCorreoElectronico(email) {
    // Expresión regular para validar correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// oír los cambios en la caja de texto e ir dando formato al RUT
document.addEventListener('input', (e) => {
    const rut = document.getElementById('rut');

    if (e.target === rut) {
        let rutFormateado = darFormatoRUT(rut.value);
        rut.value = rutFormateado;
    }
});

// dar formato XX.XXX.XXX-X
function darFormatoRUT(rut) {
    // dejar solo números y letras 'k'
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');

    // asilar el cuerpo del dígito verificador
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();

    if (rutLimpio.length < 2) return rutLimpio;

    // colocar los separadores de miles al cuerpo
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

// Función para validar el RUT
function validarRUT(rut) {
    // dejar solo números y letras 'k'
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');

    // verificar que ingrese al menos 2 caracteres válidos
    if (rutLimpio.length < 2) return false;

    // asilar el cuerpo del dígito verificador
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();

    // validar que el cuerpo sea numérico
    if (!cuerpo.replace(/[^0-9]/g, '')) return false;

    // calcular el DV asociado al cuerpo del RUT
    const dvCalculado = calcularDV(cuerpo);

    // comparar el DV del RUT recibido con el DV calculado
    return dvCalculado == dv;
}

// Función para calcular el dígito verificador del RUT
function calcularDV(cuerpoRUT) {
    let suma = 1;
    let multiplo = 0;

    for (; cuerpoRUT; cuerpoRUT = Math.floor(cuerpoRUT / 10))
        suma = (suma + (cuerpoRUT % 10) * (9 - (multiplo++ % 6))) % 11;

    return suma ? suma - 1 : 'K';
}

// Función para eliminar un usuario
function eliminarUsuario(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Función para actualizar la tabla de usuarios con un nuevo usuario
function actualizarTablaUsuarios(id, nombre, email, rut, direccion) {
    var tablaUsuarios = document.getElementById("tablaUsuarios").getElementsByTagName("tbody")[0];
    var fila = document.createElement("tr");
    fila.innerHTML = "<td>" + nombre + "</td>" +
                     "<td>" + email + "</td>" +
                     "<td>" + rut + "</td>" +
                     "<td>" + direccion + "</td>" +
                     "<td><button class='btn btn-primary btn-sm btn-editar'>Editar</button>" +
                     "<button class='btn btn-danger btn-sm ms-1' onclick='eliminarUsuario(this)'>Eliminar</button></td>";
    tablaUsuarios.appendChild(fila);
    asignarEventos();
}

// Función para editar un usuario
function editarUsuario(button) {
    var modal = document.getElementById('editUserModal');
    var row = button.closest('tr'); // Obtener la fila actual que se está editando
    var cells = row.getElementsByTagName('td');
    var nombre = cells[0].textContent;
    var email = cells[1].textContent;
    var rut = cells[2].textContent;
    var direccion = cells[3].textContent;

    // Asignar los valores actuales al formulario de edición
    document.getElementById('editUsername').value = nombre;
    document.getElementById('editEmail').value = email;
    document.getElementById('editRut').value = rut;
    document.getElementById('editDireccion').value = direccion;

    // Mostrar el modal de edición
    var editModalInstance = new bootstrap.Modal(modal, { backdrop: 'static', keyboard: false });
    editModalInstance.show();

    // Cuando se cierre el modal de edición, limpiar los valores del formulario
    modal.addEventListener('hidden.bs.modal', function () {
        document.getElementById('editUsername').value = '';
        document.getElementById('editEmail').value = '';
        document.getElementById('editRut').value = '';
        document.getElementById('editDireccion').value = '';
    });
}

// Función para obtener un ID único para cada usuario
function obtenerIdUsuario() {
    return nextUserId++;
}
