$(document).ready(function () {

    console.log("Esperando datos......");

    $.getJSON('https://mindicador.cl/api', function(data) {
        
        console.log(data); // Esto te permitirá ver los datos en la consola del navegador
        
    }).fail(function() {
        console.log('Error al consumir la API!');
        $("#dolar").text("No se pudo obtener");
        $("#dolar").addClass("h6");
    }).done(function(data) {
        $(".spinner-grow").hide();
        $(".textloader").hide();
         // Modificar precio del primer producto
        var precioProducto2 = (data.dolar.valor * 3400).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
         $("#dolar1").text('$' + precioProducto2);
         // Modificar precio del segundo producto
         var precioProducto2 = (data.dolar.valor * 8000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
         $("#dolar2").text('$' + precioProducto2);
         // Modificar precio del tercer producto
         var precioProducto3 = (data.dolar.valor * 9000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
         $("#dolar3").text('$' + precioProducto3);
         // Modificar precio del cuarto producto
         var precioProducto2 = (data.dolar.valor * 7433).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
         $("#dolar4").text('$' + precioProducto2);
         // Modificar precio del quinto producto
         var precioProducto3 = (data.dolar.valor * 6000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
         $("#dolar5").text('$' + precioProducto3);// Modificar precio del segundo producto        
    });
});