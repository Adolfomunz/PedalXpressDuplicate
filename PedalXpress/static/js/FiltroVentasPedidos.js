document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    filtrarTabla();
});

function limpiarFiltro() {
    document.getElementById('producto').value = '';
    document.getElementById('fecha').value = '';
    filtrarTabla();
}

function filtrarTabla() {
    const producto = document.getElementById('producto').value.trim().toLowerCase();
    const fecha = document.getElementById('fecha').value;
    const salesTableBody = document.querySelector('#salesTable tbody');
    const rows = salesTableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const rowProducto = row.children[1].textContent.trim().toLowerCase();
        const rowFecha = row.children[4].textContent;

        if ((producto === '' || rowProducto.includes(producto)) && (fecha === '' || rowFecha === fecha)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}