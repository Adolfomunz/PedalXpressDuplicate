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
        { id: obtenerIdUsuario(), nombre: "Juan", email: "juan@example.com" },
        { id: obtenerIdUsuario(), nombre: "María", email: "maria@example.com" },
        // Agrega más usuarios de ejemplo si lo deseas
    ];

    // Obtener la tabla de usuarios
    var tablaUsuarios = document.getElementById("tablaUsuarios").getElementsByTagName("tbody")[0];

    // Agregar usuarios de ejemplo a la tabla
    for (var i = 0; i < usuariosEjemplo.length; i++) {
        var usuario = usuariosEjemplo[i];
        var fila = document.createElement("tr");
        fila.innerHTML = "<td>" + usuario.id + "</td>" +
                         "<td>" + usuario.nombre + "</td>" +
                         "<td>" + usuario.email + "</td>" +
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

// Esta función se ejecuta cuando se hace clic en el botón "Guardar Cambios" en el modal de agregar usuario
function guardarUsuario() {
    var username = document.getElementById('addUsername').value;
    var email = document.getElementById('addEmail').value;

    // Validar que los campos no estén vacíos y que el correo electrónico tenga un formato válido
    if (username.trim() === '' || email.trim() === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Validar formato de correo electrónico
    if (!validarCorreoElectronico(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    // Agregar el usuario a la tabla
    actualizarTablaUsuarios(obtenerIdUsuario(), username, email);

    // Limpiar el formulario después de guardar
    document.getElementById('addUsername').value = '';
    document.getElementById('addEmail').value = '';

    // Cerrar el modal después de guardar
    var modal = document.getElementById('addUserModal');
    var modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
        // Ocultar el modal si la instancia existe
        modalInstance.hide();
    }
}

// Función para validar el formato de correo electrónico
function validarCorreoElectronico(email) {
    // Expresión regular para validar correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para actualizar la tabla de usuarios en la interfaz de usuario
function actualizarTablaUsuarios(id, username, email) {
    // Crear una nueva fila para el nuevo usuario
    var newRow = document.createElement('tr');
    newRow.innerHTML = '<td>' + id + '</td><td>' + username + '</td><td>' + email + '</td><td>' +
                       '<button class="btn btn-primary btn-sm btn-editar">Editar</button>' +
                       '<button class="btn btn-danger btn-sm ms-1" onclick="eliminarUsuario(this)">Eliminar</button></td>';
    // Agregar la nueva fila a la tabla de usuarios
    var tableBody = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
    tableBody.appendChild(newRow);

    asignarEventos(); // Asignar eventos a los botones de edición nuevamente
}

// Función para editar un usuario
function editarUsuario(button) {
    var modal = document.getElementById('editUserModal');
    var row = button.closest('tr'); // Obtener la fila actual que se está editando
    var idCell = row.cells[0];
    var usernameCell = row.cells[1];
    var emailCell = row.cells[2];
    var userId = idCell.textContent; // Obtener el ID único del usuario

    // Asignar los valores actuales al formulario de edición
    document.getElementById('editUsername').value = usernameCell.textContent;
    document.getElementById('editEmail').value = emailCell.textContent;

    // Modificar el ID del campo de correo electrónico para que sea único
    var editEmailField = document.getElementById('editEmail');
    editEmailField.id = 'editEmail_' + userId;

    // Mostrar el modal de edición
    if (!editModalInstance) {
        // Crear la instancia del modal si aún no existe
        editModalInstance = new bootstrap.Modal(modal);
    }

    // Limpiar y reasignar los eventos cada vez que se muestra el modal de edición
    modal.addEventListener('show.bs.modal', function () {
        // Cerrar el modal automáticamente cuando cambie algún valor
        document.getElementById('editUsername').addEventListener('change', function () {
            editModalInstance.hide();
        });

        editEmailField.addEventListener('change', function () {
            editModalInstance.hide();
        });
    });

    editModalInstance.show();

    // Cuando se cierre el modal de edición, actualizar la fila en la tabla
    modal.addEventListener('hidden.bs.modal', function () {
        // Obtener los valores actualizados del formulario de edición
        var username = document.getElementById('editUsername').value;
        var email = document.getElementById('editEmail_' + userId).value;

        // Actualizar los valores en la fila
        usernameCell.textContent = username;
        emailCell.textContent = email;

        asignarEventos(); // Asignar eventos a los botones de edición nuevamente
    });
}

// Función para obtener el ID único del usuario
function obtenerIdUsuario() {
    return nextUserId++;
}

// Función para eliminar un usuario
function eliminarUsuario(button) {
    var row = button.closest('tr'); // Obtener la fila actual que se está eliminando
    row.remove();
}
