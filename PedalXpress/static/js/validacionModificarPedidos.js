function mostrarToast(idCompra) {
    var myToast = new bootstrap.Toast(document.getElementById('toast'));
    myToast.show();
}

document.querySelector('#toast button.btn-primary').addEventListener('click', function() {
    var selectedState = document.querySelector('input[name="estado"]:checked');
    if (selectedState) {
        console.log('Estado seleccionado:', selectedState.value);
        // Aquí puedes implementar la lógica para guardar el estado seleccionado
        
        // Mostrar mensaje de confirmación
        var confirmationMessage = document.createElement('div');
        confirmationMessage.classList.add('alert', 'alert-success');
        confirmationMessage.innerHTML = 'Se ha guardado exitosamente.';
        document.querySelector('.toast-body').appendChild(confirmationMessage);
        
        // Cerrar el Toast después de 2 segundos
        setTimeout(function() {
            var myToast = new bootstrap.Toast(document.getElementById('toast'));
            myToast.hide();
        }, 2000);
    } else {
        // Mostrar mensaje de error si no se ha seleccionado ningún estado
        var errorMessage = document.createElement('div');
        errorMessage.classList.add('alert', 'alert-danger');
        errorMessage.innerHTML = 'Por favor, selecciona un estado.';
        document.querySelector('.toast-body').appendChild(errorMessage);
    }
});
