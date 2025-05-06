document.getElementById('buscar').addEventListener('keyup', function() {
    const buscar = this.value;
    if(buscar.length >= 3) { // Evitar consultas innecesarias
        fetch('buscar.php?q=' + encodeURIComponent(buscar))
            .then(response => response.json())
            .then(data => {
                const resultadosDiv = document.getElementById('resultados');
                resultadosDiv.innerHTML = data.map(item => 
                    `<div>${item.nombre}</div>`
                ).join('');
            });
    }
});

module.exports = busqueda