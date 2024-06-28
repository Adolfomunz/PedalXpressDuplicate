$(document).ready(function () {
    console.log("Esperando datos......");

    $.getJSON('https://mindicador.cl/api', function(data) {
        console.log(data); // Esto te permitirá ver los datos en la consola del navegador
    }).fail(function() {
        console.log('Error al consumir la API!');
        $("#dolar2").text("No se pudo obtener");
        $("#dolar2").addClass("h6");
    }).done(function(data) {
        $(".spinner-grow").hide();
        $(".textloader").hide();
        // Modificar precio del segundo producto
        var precioProducto2 = (data.dolar.valor * 8000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $("#dolar2").text('$' + precioProducto2);
    });
});
