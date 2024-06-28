function habilitarEdicion() {
    var elementosEditable = document.querySelectorAll('.form-control');
    elementosEditable.forEach(function(elemento) {
        elemento.contentEditable = true;
    });
    document.querySelector('.btn-primary').classList.add('d-none');
    document.querySelector('.btn-success').classList.remove('d-none');
}

function guardarCambios() {
    var elementosEditable = document.querySelectorAll('.form-control');
    elementosEditable.forEach(function(elemento) {
        elemento.contentEditable = false;
    });
    document.querySelector('.btn-primary').classList.remove('d-none');
    document.querySelector('.btn-success').classList.add('d-none');
}