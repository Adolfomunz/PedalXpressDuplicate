$(document).ready(function () {
    console.log("Esperando datos......");

    $.getJSON('https://mindicador.cl/api', function(data) {
        console.log(data); // Esto te permitirá ver los datos en la consola del navegador
    }).fail(function() {
        console.log('Error al consumir la API!');
        $("#dolar1").text("No se pudo obtener");
        $("#dolar1").addClass("h6");
    }).done(function(data) {
        $(".spinner-grow").hide();
        $(".textloader").hide();
        // Modificar precio del segundo producto
        var precioProducto1 = (data.dolar.valor * 3400).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $("#dolar1").text('$' + precioProducto1);
    });
});
