document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const cancelButton = document.getElementById('cancelButton');
    const submitButton = document.getElementById('submitButton');
    const cancelUrl = form.getAttribute('data-cancel-url');
    const successUrl = form.getAttribute('data-success-url');

    const numTarjeta = document.getElementById('numTarjeta');
    const fechaExpiracion = document.getElementById('fechaExpiracion');
    const cvv = document.getElementById('cvv');
    const nombreTitular = document.getElementById('nombreTitular');
    const correo = document.getElementById('correo');
    const ubicacion = document.getElementById('ubicacion');

    submitButton.addEventListener('click', function () {
        if (validarFormulario()) {
            alert('Transacción completada. Se enviará la boleta a su correo.');
            window.location.href = successUrl;
            
        }
    });
    

    cancelButton.addEventListener('click', function () {
        alert('Has cancelado la transacción');
        window.location.href = cancelUrl;
    });

    numTarjeta.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 16);
    });

    fechaExpiracion.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9/]/g, '').slice(0, 5);
        if (this.value.length === 2 && !this.value.includes('/')) {
            this.value = this.value + '/';
        }
    });

    cvv.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 4);
    });

    nombreTitular.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });

    ubicacion.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
    });

    function validarFormulario() {
        const numTarjetaValue = numTarjeta.value.trim();
        const fechaExpiracionValue = fechaExpiracion.value.trim();
        const cvvValue = cvv.value.trim();
        const nombreTitularValue = nombreTitular.value.trim();
        const correoValue = correo.value.trim();
        const ubicacionValue = ubicacion.value.trim();

        if (!numTarjetaValue || !/^\d{16}$/.test(numTarjetaValue) || !validarTarjeta(numTarjetaValue)) {
            mostrarError(numTarjeta, 'Por favor, ingrese un número de tarjeta válido de 16 dígitos.');
            return false;
        }

        if (!fechaExpiracionValue || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(fechaExpiracionValue)) {
            mostrarError(fechaExpiracion, 'Por favor, ingrese una fecha de expiración válida en formato MM/AA.');
            return false;
        }

        if (!cvvValue || !/^\d{3,4}$/.test(cvvValue)) {
            mostrarError(cvv, 'Por favor, ingrese un CVV válido de 3 o 4 dígitos.');
            return false;
        }

        if (!nombreTitularValue || nombreTitularValue.length < 3) {
            mostrarError(nombreTitular, 'Por favor, ingrese el nombre del titular de la tarjeta con al menos 3 letras.');
            return false;
        }

        if (!correoValue || !/^[^\s@]+@[^\s@]+\.(com|cl|es|net|org)$/.test(correoValue)) {
            mostrarError(correo, 'Por favor, ingrese un correo electrónico válido que termine en .com, .cl, .es, .net, o .org.');
            return false;
        }

        if (!ubicacionValue || ubicacionValue.length < 6) {
            mostrarError(ubicacion, 'Por favor, ingrese una ubicación con al menos 6 letras.');
            return false;
        }

        return true;
    }

    function mostrarError(element, message) {
        const parent = element.parentElement;
        const error = document.createElement('div');
        error.className = 'alert alert-danger';
        error.innerText = message;
        parent.appendChild(error);
        setTimeout(() => error.remove(), 3000);
    }

    function validarTarjeta(numero) {
        let nCheck = 0, bEven = false;
        for (let n = numero.length - 1; n >= 0; n--) {
            let cDigit = numero.charAt(n),
                nDigit = parseInt(cDigit, 10);
            if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
            nCheck += nDigit;
            bEven = !bEven;
        }
        return (nCheck % 10) === 0;
    }
});
